import path from "path";
import Sequelize from "sequelize";
import config from "../lib/variables/config";

const db = {};
const { MYSQL_URL, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE } = config;
const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_USER, MYSQL_PASS, {
  host: MYSQL_URL,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require("./users")(sequelize, Sequelize);
db.googleOauths = require("./googleOauths")(sequelize, Sequelize);

db.myVideos = require("./myVideos")(sequelize, Sequelize);
db.videos = require("./videos")(sequelize, Sequelize);
db.talkIds = require("./talkIds")(sequelize, Sequelize);
db.tags = require("./tags")(sequelize, Sequelize);
db.langKO = require("./langKO")(sequelize, Sequelize);
db.langEN = require("./langEN")(sequelize, Sequelize);
db.langZHCN = require("./langZHCN")(sequelize, Sequelize);
db.langZHTW = require("./langZHTW")(sequelize, Sequelize);
db.langJA = require("./langJA")(sequelize, Sequelize);

export default db;
