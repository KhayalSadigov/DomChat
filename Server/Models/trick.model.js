const { DataTypes, Model } = require("sequelize");
const sequelize = require("../Config/db");

const Trick = sequelize.define("Trick", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photo: {
    type: DataTypes.TEXT("long"),
    allowNull: true,
  },
});
module.exports = Trick;
