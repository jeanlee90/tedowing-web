module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    uid: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.TEXT,
    },
    language: {
      type: Sequelize.TEXT,
    },
    googleId: {
      type: Sequelize.TEXT,
    },
  });

  return users;
};
