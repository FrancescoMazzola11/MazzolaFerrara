const db = require("../config/database");
const Sequelize = require("sequelize");

const PolicyMaker = db.define(
  "PolicyMaker",
  {
    pmID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "PolicyMaker",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "pmID" }],
      },
    ],
  }
);

PolicyMaker.emailEsistente = async function(email) {
  try {
    const pm = await PolicyMaker.findOne({
      where: {
        mail : email
      }
    });
    return pm;
  } catch(error) {
    throw error;
  }
}

module.exports = PolicyMaker;
