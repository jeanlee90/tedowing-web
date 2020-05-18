module.exports = (sequelize, Sequelize) => {
  const googleOauths = sequelize.define(
    "googleOauths",
    {
      uid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      googleId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      email: {
        type: Sequelize.TEXT,
      },
      displayName: {
        type: Sequelize.TEXT,
      },
      accessToken: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
  );

  return googleOauths;
};
