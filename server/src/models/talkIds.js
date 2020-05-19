module.exports = (sequelize, Sequelize) => {
  const talkIds = sequelize.define(
    "talkIds",
    {
      talkId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      videoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  return talkIds;
};
