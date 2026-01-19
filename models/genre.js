'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});

  Genre.associate = (models) => {
    // One Genre has many Books
    Genre.hasMany(models.Book, { foreignKey: 'genreId', as: 'books' });
  };

  return Genre;
};
