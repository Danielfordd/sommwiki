'use strict';
module.exports = (sequelize, DataTypes) => {
  const articleUsers = sequelize.define('articleUsers', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  articleUsers.associate = function(models) {
    // associations can be defined here
  };
  return articleUsers;
};