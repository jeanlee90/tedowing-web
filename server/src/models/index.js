import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import config from "../utils/config";

const db = {};
const basename = path.basename(__filename);
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

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
