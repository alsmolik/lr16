contactsController = require('../controllers/contacts.controller');

module.exports = function (app) {
    app.route('/api/contacts/:id')
        .get(contactsController.get);

    app.route('/api/contacts/')
        .post(contactsController.add);
};