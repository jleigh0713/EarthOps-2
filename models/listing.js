module.exports = function (sequelize, DataTypes) {

    // Setup JobListing model and its fields.
    var Listing = sequelize.define('Listing', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        notEmpty: true
      },
      title: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      description: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      contact: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      category: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      zipcode: {
        type: DataTypes.STRING,
        notEmpty: true
      },
      pay: {
        type: DataTypes.DECIMAL,
        notEmpty: true
      },
      dueAt: {
        type: DataTypes.DATE
      }
    });
  
    return Listing;
  
  }