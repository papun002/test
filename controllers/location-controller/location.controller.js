const StaffLocation = require("../../models/location/location.model");
const StaffModel = require("../../models/staff/staff.model");

// Update or Create Location
exports.updateLocation = async (req, res) => {
    try {
        const { latitude, longitude } = req.body;
        const staffId = req.sid;

        if (!staffId || !latitude || !longitude) {
            return res.status(400).json({ message: "Staff ID, Latitude, and Longitude are required" });
        }

        // Upsert: Create if not exists, update if exists (based on unique constraints, likely staffId)
        // existing model has unique: true for staffId.
        const [location, created] = await StaffLocation.upsert({
            staffId,
            latitude,
            longitude,
            cid: req.cid,
            updatedAt: new Date(),
            isDeleted: false
        });

        res.status(200).json({
            message: "Location updated successfully",
            location
        });

    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get Location by Staff ID
exports.getLocationByStaffId = async (req, res) => {
    try {
        const { staffId } = req.query;

        if (!staffId) {
            return res.status(400).json({ message: "Staff ID is required" });
        }

        const location = await StaffLocation.findOne({
            where: {
                staffId,
                cid: req.cid,
                isDeleted: false
            },
            include: {
                model: StaffModel, // Included Staff model to get staff details with location
            }
        });

        if (!location) {
            return res.status(404).json({ message: "Location not found for this staff" });
        }

        res.status(200).json({ location });

    } catch (error) {
        console.error("Error fetching location:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getLocation = async (req, res) => {
    try {
        // Changed findOne to findAll to get all locations for the firm
        const locations = await StaffLocation.findAll({
            where: {
                cid: req.cid,
                isDeleted: false
            },
            include: {
                model: StaffModel, // Included Staff model to get staff details with location
            }
        });
        if (!locations || locations.length === 0) {
            return res.status(404).json({ message: "No locations found for this firm" });
        }
        res.status(200).json({ locations }); // Returning list of locations
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
