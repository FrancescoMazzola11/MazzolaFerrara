const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Comment', {
    commentID: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    discussionID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Discussion',
        key: 'discussionID'
      }
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
    tableName: 'Comment',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "commentID" },
        ]
      },
      {
        name: "Comment_FK",
        using: "BTREE",
        fields: [
          { name: "farmerID" },
        ]
      },
      {
        name: "Comment_FK_1",
        using: "BTREE",
        fields: [
          { name: "discussionID" },
        ]
      },
    ]
  });
};
