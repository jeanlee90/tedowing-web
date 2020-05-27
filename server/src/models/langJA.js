module.exports = (sequelize, Sequelize) => {
  const langJA = sequelize.define(
    "langJA",
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
      tableName: "langJA",
      timestamps: false,
      initialAutoIncrement: false,
    },
  );

  return langJA;
};
