'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    header: DataTypes.STRING,
    content: DataTypes.STRING,
    orderNumber: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  Section.associate = function(models) {
    Section.belongsTo(models.Article, {foreignKey:'articleId'})
  };
  return Section;
};
