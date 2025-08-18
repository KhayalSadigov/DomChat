const { DataTypes } = require("sequelize");
const sequelize = require("../Config/db");

const Message = sequelize.define("Message", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Assuming the User model is defined in the same database
      key: "id",
    },
  },
  receiver: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // Assuming the User model is defined in the same database
      key: "id",
    },
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isDeleteForSender: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  isDeleteForReceiver: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Message;
