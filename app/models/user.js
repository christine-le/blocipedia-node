const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {msg: "must be a valid email"}
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    ,
    role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },{
    freezeTableName: true
  });

  User.prototype.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch){
      if(err){
        return cb(err);
      } else {
        cb(null, isMatch);
      }
    });
  }

  // Create a hook
  User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
    })
    .catch(err => { 
      throw new Error(); 
    });
  });

  return User;
};

