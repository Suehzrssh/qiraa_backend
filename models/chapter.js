'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chapter extends Model {
    static associate(models) {
      Chapter.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book',
        onDelete: 'CASCADE',
      });
    }
  }

  Chapter.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },

      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      bookId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Books',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Chapter',
      tableName: 'Chapters',
      timestamps: true,
    }
  );

  return Chapter;
};
