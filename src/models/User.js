const User = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    display_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
    tableName: 'users',
  });

  User.associate = (models) => {
    User.hasMany(models.BlogPost, {
      foreignKey: 'id',
      as: 'blog_posts'
    })
  }

  return User;
}

module.exports = User;
