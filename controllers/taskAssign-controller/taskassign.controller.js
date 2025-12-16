const taskAssignModel = require("../../models/taskAssign/taskAssign.model");
const StaffModel = require("../../models/staff/staff.model");
const RouteModel = require("../../models/route/route.model");

// create task assignment
exports.createTaskAssign = async (req, res) => {
  try {
    const { date, staffId, routeId } = req.body;
    const cid = req.cid;

    // 🔴 Validation
    if (!date || !staffId || !routeId) {
      return res.status(400).json({
        success: false,
        message: "date, staffId and routeId are required",
      });
    }

    // 🔴 One staff → one route per date
    const staffBusy = await taskAssignModel.findOne({
      where: {
        date,
        staffId,
        cid,
        isDeleted: false,
      },
    });

    if (staffBusy) {
      return res.status(409).json({
        success: false,
        message: "This staff is already assigned on this date",
      });
    }

    // ✅ Create task assignment
    const task = await taskAssignModel.create({
      date,
      staffId,
      routeId,
      cid,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Task assigned successfully",
      data: task,
    });
  } catch (error) {
    console.error("Create Task Assign Error:", error);

    // 🔴 Handle DB unique constraint error (if added)
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        success: false,
        message: "This staff is already assigned on this date",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get all pending tasks for admin
exports.getAllPendingTasksForAdmin = async (req, res) => {
  try {
    const cid = req.cid; // admin company id

    const tasks = await taskAssignModel.findAll({
      where: {
        cid,
        status: "pending",
        isDeleted: false,
      },
      order: [["date", "desc"]],
      include: [
        {
          model: StaffModel,
          as: "staff",
          attributes: ["id", "name", "nickName"], // choose what admin needs
        },
        {
          model: RouteModel,
          as: "route",
          attributes: ["id", "routeName"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Pending tasks fetched successfully",
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get Pending Tasks Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// approve or reject task assignment
exports.approveRejectTaskAssign = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { status } = req.body;
    const cid = req.cid;

    // 🔴 Validate status
    if (!["success", "reject"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be either 'success' or 'reject'",
      });
    }

    // 🔴 Find task
    const task = await taskAssignModel.findOne({
      where: {
        id: taskId,
        cid,
        isDeleted: false,
      },
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 🔴 Prevent re-approval
    if (task.status !== "pending") {
      return res.status(409).json({
        success: false,
        message: `Task already ${task.status}`,
      });
    }

    // ✅ Update status
    task.status = status;
    await task.save();

    return res.status(200).json({
      success: true,
      message: `Task ${status} done!`,
      data: task,
    });
  } catch (error) {
    console.error("Approve/Reject Task Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// get task by staff id for staff in recent dates
exports.getTasksByStaffId = async (req, res) => {
  try {
    const sid = req.sid; // from auth middleware
    const cid = req.cid; // from auth middleware

    const tasks = await taskAssignModel.findAll({
      where: {
        staffId: sid,
        cid,
        isDeleted: false,
      },
      order: [["date", "desc"]],
      include: [
        {
          model: RouteModel,
          as: "route",
          attributes: ["id", "routeName"],
        },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Tasks fetched successfully",
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.error("Get Tasks by Staff ID Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
