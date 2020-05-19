module.exports = (sequelize, Sequelize) => {
  const langEN = sequelize.define(
    "langEN",
    {
      videoId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      title: {
        type: Sequelize.TEXT,
      },
      description: {
        type: Sequelize.TEXT,
      },
      author: {
        type: Sequelize.TEXT,
      },
      script: {
        type: Sequelize.JSON,
      },
    },
    {
      freezeTableName: true,
      tableName: "langEN",
      timestamps: false,
      initialAutoIncrement: false,
    },
  );

  return langEN;
};
