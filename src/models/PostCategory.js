module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    categoryId: {
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'posts_categories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'categoryId',
      through: PostCategory,
      otherKey: 'postId',
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'postId',
      through: PostCategory,
      otherKey: 'categoryId',
      as: 'blog_posts',
    });
  }

  return PostCategory;
}
