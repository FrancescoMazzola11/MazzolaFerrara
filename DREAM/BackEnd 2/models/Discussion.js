const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Discussion', {
    discussionID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    topic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    farmerID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Farmer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'Discussion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "discussionID" },
        ]
      },
      {
        name: "Discussion_FK",
        using: "BTREE",
        fields: [
          { name: "farmerID" },
        ]
      },
    ]
  });
};
