'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Book → Genre (many-to-one)
      Book.belongsTo(models.Genre, {
        foreignKey: 'genreId',
        as: 'genre',
      });

      // Book → Chapters (one-to-many)
      Book.hasMany(models.Chapter, {
        foreignKey: 'bookId',
        as: 'chapters',
        onDelete: 'CASCADE',
      });
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      info: {
        type: DataTypes.STRING,
      },

      description: {
        type: DataTypes.TEXT,
      },

      historical_context: {
        type: DataTypes.TEXT,
      },

      author_bio: {
        type: DataTypes.TEXT,
      },

      image: {
        type: DataTypes.STRING,
      },

      genreId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Genres',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'Books',
      timestamps: true,
    }
  );

  return Book;
};
