const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const util = require("util");
const archiver = require("archiver");
const unzipper = require("unzipper");

const execPromise = util.promisify(exec);
const BackupHistory = require("../../models/backup/backupHistroy"); // Ensure spelling
const BACKUP_DIR = path.join(__dirname, "../../backups");

// Ensure backup folder exists
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

/* -------------------------------------------------------------------------- */
/*                              CREATE BACKUP                                  */
/* -------------------------------------------------------------------------- */
exports.createBackup = async (req, res) => {
  try {
    const cid = req.cid;

    const sqlFileName = `backup_${cid}_${Date.now()}.sql`;
    const sqlFilePath = path.join(BACKUP_DIR, sqlFileName);
    const zipFilePath = sqlFilePath.replace(".sql", ".zip");

    // Adjust path to MySQL installation
    const mysqldumpPath =
      process.env.MYSQL_DUMP_PATH ||
      `"C:\\Program Files\\MySQL\\MySQL Server 9.4\\bin\\mysqldump.exe"`;

    // Dump database including drop table to prevent duplicates on restore
    const dumpCommand = `"${mysqldumpPath}" --add-drop-table -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASS} ${process.env.DB_NAME} > "${sqlFilePath}"`;
    await execPromise(dumpCommand, { shell: true });
    console.log("Database dumped successfully:", sqlFilePath);

    // Zip the SQL file
    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(zipFilePath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", resolve);
      archive.on("error", reject);

      archive.pipe(output);
      archive.file(sqlFilePath, { name: path.basename(sqlFilePath) });
      archive.finalize();
    });

    // Delete the original SQL
    fs.unlinkSync(sqlFilePath);

    // Save backup history
    const stats = fs.statSync(zipFilePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2) + " MB";

    const record = await BackupHistory.create({
      cid,
      date: new Date().toLocaleString(),
      size: sizeMB,
      status: "Completed",
      fileUrl: `${process.env.BASE_URL}/backups/${path.basename(zipFilePath)}`,
      type: "Backup",
    });

    // Send ZIP for download
    res.download(zipFilePath, path.basename(zipFilePath), async (err) => {
      if (err) {
        console.error("Download error:", err);
        record.status = "Failed";
        await record.save();
      }
    });
  } catch (error) {
    console.error("Backup failed:", error);
    res.status(500).json({ message: "Backup failed!", error: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                              RESTORE BACKUP                                  */
/* -------------------------------------------------------------------------- */
exports.restoreBackup = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file uploaded!" });

    const zipFilePath = req.file.path;
    const extractDir = path.join(BACKUP_DIR, `restore_${Date.now()}`);
    if (!fs.existsSync(extractDir))
      fs.mkdirSync(extractDir, { recursive: true });

    // Extract ZIP
    await fs
      .createReadStream(zipFilePath)
      .pipe(unzipper.Extract({ path: extractDir }))
      .promise();

    // Find SQL file
    const files = fs.readdirSync(extractDir).filter((f) => f.endsWith(".sql"));
    if (!files.length) throw new Error("No .sql file found in ZIP!");
    const sqlFilePath = path.join(extractDir, files[0]);

    // Restore database safely (drop tables first)
    const mysqlPath =
      process.env.MYSQL_PATH ||
      `"C:\\Program Files\\MySQL\\MySQL Server 9.4\\bin\\mysql.exe"`;
    const restoreCommand = `"${mysqlPath}" -h ${process.env.DB_HOST} -u ${process.env.DB_USER} -p${process.env.DB_PASS} ${process.env.DB_NAME} < "${sqlFilePath}"`;
    await execPromise(restoreCommand, { shell: true });
    console.log("Database restored successfully:", sqlFilePath);

    // Save restore history
    const stats = fs.statSync(sqlFilePath);
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2) + " MB";
    await BackupHistory.create({
      cid: req.cid || 0,
      date: new Date().toLocaleString(),
      size: sizeMB,
      status: "Completed",
      fileUrl: null,
      type: "Restore",
    });

    // Cleanup
    fs.unlinkSync(zipFilePath);
    fs.unlinkSync(sqlFilePath);
    fs.rmdirSync(extractDir, { recursive: true });

    res.status(200).json({ message: "Database restored successfully!" });
  } catch (error) {
    console.error("Restore failed:", error);
    // Log failed restore
    await BackupHistory.create({
      cid: req.cid || 0,
      date: new Date().toLocaleString(),
      size: 0,
      status: "Failed",
      fileUrl: null,
      type: "Restore",
    });
    res.status(500).json({ message: "Restore failed!", error: error.message });
  }
};

/* -------------------------------------------------------------------------- */
/*                              GET BACKUP HISTORY                             */
/* -------------------------------------------------------------------------- */
exports.getBackupHistory = async (req, res) => {
  try {
    const history = await BackupHistory.findAll({
      where: { cid: req.cid },
      order: [["id", "DESC"]],
    });
    res.status(200).json({ success: true, history });
  } catch (error) {
    console.error("Error fetching backup history:", error);
    res
      .status(500)
      .json({ message: "Error fetching history", error: error.message });
  }
};
