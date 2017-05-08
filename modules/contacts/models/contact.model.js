"use strict";

module.exports = function(sequelize, DataTypes) {
    let Contact = sequelize.define('Contact', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                Contact.belongsTo(models.Person, {foreignKey: 'person1_id', targetKey: 'id'});
                Contact.belongsTo(models.Person, {foreignKey: 'person2_id', targetKey: 'id'});
            }
        }
    });

    return Contact;
};