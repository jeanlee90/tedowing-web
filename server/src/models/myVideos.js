module.exports = (sequelize, Sequelize) => {
  const myVideos = sequelize.define("myVideos", {
    uid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    videoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    isFavorite: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  return myVideos;
};
