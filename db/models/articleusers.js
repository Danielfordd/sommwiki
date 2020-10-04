'use strict';
module.exports = (sequelize, DataTypes) => {
  const articleUsers = sequelize.define('articleUsers', {
    userId: DataTypes.INTEGER,
    articleId: DataTypes.INTEGER
  }, {});
  articleUsers.associate = function(models) {
    articleUsers.belongsT
  };
  return articleUsers;
};
