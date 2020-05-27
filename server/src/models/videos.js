module.exports = (sequelize, Sequelize) => {
  const videos = sequelize.define("videos", {
    videoId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    talkId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    },
    originUrl: {
      type: Sequelize.TEXT,
    },
    thumbnail: {
      type: Sequelize.TEXT,
    },
    author: {
      type: Sequelize.TEXT,
    },
    authorPhoto: {
      type: Sequelize.TEXT,
    },
    width: {
      type: Sequelize.INTEGER,
    },
    height: {
      type: Sequelize.INTEGER,
    },
    videoLow: {
      type: Sequelize.TEXT,
    },
    videoMedium: {
      type: Sequelize.TEXT,
    },
    videoHigh: {
      type: Sequelize.TEXT,
    },
    duration: {
      type: Sequelize.TEXT,
    },
    videoType: {
      type: Sequelize.INTEGER,
    },
    uploadDate: {
      type: Sequelize.DATE,
    },
    timing: {
      type: Sequelize.JSON,
    },
  });

  return videos;
};
