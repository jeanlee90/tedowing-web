module.exports = (sequelize, Sequelize) => {
  const langKO = sequelize.define(
    "langKO",
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
      tableName: "langKO",
      timestamps: false,
      initialAutoIncrement: false,
    },
  );

  return langKO;
};
