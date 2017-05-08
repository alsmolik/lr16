"use strict";

module.exports = function(sequelize, DataTypes) {
    let Person = sequelize.define('Person', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        timezone: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        start_work_time: DataTypes.TIME,
        end_work_time: DataTypes.TIME
    });

    return Person;
};