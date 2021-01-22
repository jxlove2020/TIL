npm init 

npm i express morgan nunjucks sequelize sequelize-cli mysql2

npm i -D nodemon

// public, routes, views 폴더와 app.js 파일을 만들어 줍니다.

npx sequelize init

// npx sequelize init 하면 config, migrations, models, seeders 폴더가 생깁니다.
// config/config.json 의 development 의 db 와 password 변경
// models/index.js 파일의 기존 내용을 모두 지우고 아래 내용으로 변경

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

module.exports = db;