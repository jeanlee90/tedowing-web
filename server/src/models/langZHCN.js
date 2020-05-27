module.exports = (sequelize, Sequelize) => {
  const langZHCN = sequelize.define(
    "langZHCN",
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
      tableName: "langZHCN",
      timestamps: false,
      initialAutoIncrement: false,
    },
  );

  return langZHCN;
};
