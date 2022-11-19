module.exports = (sequelize, DataTypes) => {
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
    tableName: 'posts_categories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'post_id',
      through: PostCategory,
      foreignKey: 'category_id',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'category_id',
      through: PostCategory,
      foreignKey: 'post_id',
      as: 'blog_posts',
    });
  }

  return PostCategory;
}
