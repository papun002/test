const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const Firm = require("../auth/signup");
const routeModel = require("../route/route.model");
const staffModel = require("../staff/staff.model");

const taskAssign = sequelize.define(
  "taskAssign",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: staffModel,
        key: "id",
      },
    },
    routeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: routeModel,
        key: "id",
      },
    },
    cid: {
      type: DataTypes.INTEGER,
      references: {
        model: Firm,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("pending", "success", "reject"),
      defaultValue: "pending",
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "taskassign" }
);

/* ✅ Associations */
taskAssign.belongsTo(staffModel, {
  foreignKey: "staffId",
  as: "staff",
});

taskAssign.belongsTo(routeModel, {
  foreignKey: "routeId",
  as: "route",
});


module.exports = taskAssign;
