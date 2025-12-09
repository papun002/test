const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/db");
const bcrypt = require("bcryptjs");

const Firm = sequelize.define(
  "Firm",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firmName: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        notEmpty: { msg: "Firm Name is required" },
        len: { args: [2, 150], msg: "Firm Name must be 2-150 characters" },
      },
    },
    mobileNo: {
  type: DataTypes.STRING(15),
  allowNull: false,
  validate: {
    notEmpty: { msg: "Mobile No is required" },
    is: {
      args: /^[0-9]{10,15}$/,
      msg: "Mobile No must be 10-15 digits",
    },
  },
},
password: {
  type: DataTypes.STRING(200),
  allowNull: false,
  validate: {
    notEmpty: { msg: "Password is required" },
    len: { args: [6, 200], msg: "Password must be at least 6 characters" },
  },
},
  },
  {
    tableName: "firms",
    timestamps: true,
    underscored: true,
  }
);

// Hash password before saving
Firm.beforeCreate(async (firm) => {
  const salt = await bcrypt.genSalt(6);
  firm.password = await bcrypt.hash(firm.password, salt);
});

// Optional: hash password on update
Firm.beforeUpdate(async (firm) => {
  if (firm.changed("password")) {
    const salt = await bcrypt.genSalt(6);
    firm.password = await bcrypt.hash(firm.password, salt);
  }
});

module.exports = Firm;
