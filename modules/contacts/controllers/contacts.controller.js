const db = require('../../../db');
const contactsService = new (require('../services/contacts.service'))(db.Contact, db.Person);

exports.add = function (req, res) {
    if (req.body.person1_id && req.body.person2_id) {
        contactsService.add(req.body.person1_id, req.body.person2_id)
            .then(result => res.status(201).end('Added'))
            .catch(err => res.status(500).json({message: err.message}));
    } else {
        res.status(400).json({message: 'Wrong params'});
    }
};

exports.get = function (req, res) {
    contactsService.get(+req.params.id)
        .then(result => res.json(result))
        .catch(err => res.status(500).json({message: err.message}));
};