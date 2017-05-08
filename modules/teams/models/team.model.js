"use strict";

module.exports = function(sequelize, DataTypes) {
    let Team = sequelize.define('Team', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Team.hasMany(models.Person, {foreignKey: 'team_id', targetKey: 'id'});
            }
        }
    });

    return Team;
};