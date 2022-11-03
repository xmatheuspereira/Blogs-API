const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    post_id: {
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    category_id: {
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    tableName: 'post_categories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'post_id',
      foreignKey: 'Category_d',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'Category_id',
      foreignKey: 'post_id',
      as: 'blogPosts',
    });
  }

  return PostCategory;
}

module.exports = PostCategory;
