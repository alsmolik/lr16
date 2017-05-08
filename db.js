"use strict";

const fs = require('fs');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || "development";
const dbConfig = require('./config.json')['db'][env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
var db = {};

fs
    .readdirSync('./modules')
    .forEach(function (dir) {
        if (dir.indexOf('.') == 0) return;
        if (fs.existsSync('./modules/' + dir + '/models/')) {
            fs.readdirSync('./modules/' + dir + '/models/').forEach(function (file) {
                var model = sequelize.import('./modules/' + dir + '/models/' + file);
                db[model.name] = model;
            });
        }
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;