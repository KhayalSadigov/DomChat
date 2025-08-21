const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  contacts: {
    type: DataTypes.JSON,
    defaultValue: [],
    allowNull: false,
  },
});

module.exports = User;
