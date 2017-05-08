teamsController = require('../controllers/teams.controller');

module.exports = function (app) {
    app.route('/api/teams/')
        .post(teamsController.add);
};