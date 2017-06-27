
module.exports = function (sequelize, DataTypes) {

  var Todo = sequelize.define('Todo', {
    title: {type: DataTypes.STRING,
            allowNull: true,
            validate: {notEmpty: {message: "Title is required."}}
          },
    description: DataTypes.STRING,
    due_date:{
            type: DataTypes.STRING,
            allowNull: true,
            validate: {notEmpty: {message: "Title is required."}}
          }
  },
  {
    underscored: true
  });

  return Todo;
};
