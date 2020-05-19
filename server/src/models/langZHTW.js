module.exports = (sequelize, Sequelize) => {
  const langZHTW = sequelize.define(
    "langZHTW",
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
      tableName: "langZHTW",
      timestamps: false,
      initialAutoIncrement: false,
    },
  );

  return langZHTW;
};
