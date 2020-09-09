'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserT = sequelize.define('UserT', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isLoggedIn: DataTypes.BOOLEAN
  }, {});
  UserT.associate = function(models) {
    // associations can be defined here
  };
  return UserT;
};