const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

const ContactMock = DBConnectionMock.define('Contact',
    {
        'id': 1,
        'person1_id': 1,
        'person2_id': 2
    }
);

const PersonMock = DBConnectionMock.define('Person',
    {
        'id': 1,
        'name': 'Alexander Smolik',
        'timezone': 3,
        'start_work_time': '09:00',
        'end_work_time': '18:00'
    }
);

let contactsService = new (require('../services/contacts.service'))(ContactMock, PersonMock);

describe('add', () => {
    it('adds user contact', () => {
        return contactsService.add(1, 2)
            .then((result) => {
                expect(result._values.person1_id).toBe(1);
                expect(result._values.person2_id).toBe(2);
            });
    });
});