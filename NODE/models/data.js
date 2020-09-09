'use strict';
module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define('Data', {
    fName: DataTypes.STRING,
    fType: DataTypes.STRING,
    fSize: DataTypes.STRING,
    fDate: DataTypes.STRING,
    file: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Data.associate = function(models) {
    // associations can be defined here
    models.UserT.hasMany(Data,{foreignKey:'email'})
    Data.belongsTo(models.UserT,{foreignKey:'email'})
  };
  return Data;
};