'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING
  }, {});
  Article.associate = function(models) {
    Article.hasMany(models.Section, { foreignKey: 'articleId' })
    const columnMapping = {
      through: 'articleUser',
      otherKey: 'userId',
      foreignKey: 'articleId'
    }
    Article.belongsToMany(models.User, columnMapping)
  };
  return Article;
};
