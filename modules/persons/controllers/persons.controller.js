const db = require('../../../db');
const personsService = new (require('../services/persons.service'))(db.Person);

exports.all = function (req, res) {
    personsService.getAll()
        .then(people => res.json(people))
        .catch(err => res.status(500).json({message: err.message}));
};

exports.add = function (req, res) {
    if (req.body.name && req.body.start_work_time && req.body.end_work_time) {
        personsService.add(req.body)
            .then(() => res.status(201).end('Added'))
            .catch(err => res.status(500).json({message: err.message}));
    } else {
        res.status(400).json({message: 'Wrong params'});
    }
};