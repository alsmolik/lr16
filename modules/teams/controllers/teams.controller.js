const db = require('../../../db');
const teamsService = new (require('../services/teams.service'))(db.Team);

exports.add = function (req, res) {
    if (req.body.name) {
        teamsService.add(req.body)
            .then(() => res.status(201).end('Added'))
            .catch(err => res.status(500).json({message: err.message}))
    } else {
        res.status(400).json({message: 'Wrong params'});
    }
};