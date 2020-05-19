module.exports = (sequelize, Sequelize) => {
  const tags = sequelize.define(
    "tags",
    {
      tag: {
        type: Sequelize.TEXT,
        primaryKey: true,
        allowNull: false,
      },
      videoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return tags;
};
