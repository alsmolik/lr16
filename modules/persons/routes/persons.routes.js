personsController = require('../controllers/persons.controller');

module.exports = function (app) {
    app.route('/api/users/')
        .get(personsController.all)
        .post(personsController.add);
};