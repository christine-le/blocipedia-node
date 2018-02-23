module.exports = (sequelize, DataTypes) => {

  const Wiki = sequelize.define('Wiki', {
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    private: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: (models) => {
        Wiki.belongsTo(models.User);
      }
    }
  });

  return Wiki;
};
// sequelize model:create --name Wiki --attributes title:string,body:string,private:boolean