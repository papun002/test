const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../../models/auth/signup");
const Staff = require("../../models/staff/staff.model");

const StaffLocation = sequelize.define(
    "StaffLocation",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        staffId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true, // one latest location per staff
            references: {
                model: Staff,
                key: "id",
            },
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Firm,
                key: "id",
            },
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "stafflocations",
        timestamps: false,
    }
);

module.exports = StaffLocation;
