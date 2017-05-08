"use strict";

const express = require('express');
const app = express();
const fs = require('fs');
const db = require('./db');
const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

fs.readdirSync('./modules').forEach(function (dir) {
    if (dir.indexOf('.') == 0) return;
    if (fs.existsSync(('./modules/' + dir + '/routes/')))
        fs.readdirSync('./modules/' + dir + '/routes/').forEach(function (file) {
            require('./modules/' + dir + '/routes/' + file)(app);
        });
});

db.sequelize.sync()
    .then(() => {
        app.listen(3000);
    });

module.exports = app;