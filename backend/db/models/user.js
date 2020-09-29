'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName:{
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        isEmail: true,
        len: [3, 255],
      }
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      validates: {
        len: [1, 255],
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING.BINARY,
      validates: {
        len: [60, 60],
      },
    },
    tokenId: {
      type: DataTypes.STRING
    }
  }, {});

  User.associate = function(models) {
    const columnMapping = {
      through: 'articleUser',
      otherKey: 'articleId',
      foreignKey: 'userId'
    }
    User.belongsToMany(models.Article, columnMapping)
  };

  User.prototype.toSafeObject = function () {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      username: this.username
    };
  }

  return User;
};
