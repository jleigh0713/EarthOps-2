var bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {

  // setup User model and its fields.
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });

  // Compares stored hashed password with what was entered.
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;

};