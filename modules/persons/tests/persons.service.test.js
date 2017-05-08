const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

const PersonMock = DBConnectionMock.define('Person',
    {
        'id': 1,
        'name': 'Alexander Smolik',
        'timezone': 3,
        'start_work_time': '09:00',
        'end_work_time': '18:00'
    }
);

PersonMock.findAndCountAll = function () {
    return new Promise((resolve, reject) => {
        this.findOne()
            .then((person) => {
                resolve({rows: [person], count: 1});
            });
    });
};

let personsService = new (require('../services/persons.service'))(PersonMock);

describe('getAll', () => {
    it('return people list', () => {
        return personsService.getAll()
            .then((result) => {
                expect(result.count).toBeDefined();
                expect(result.rows).toBeDefined();
            });
    });
});

describe('add', () => {
    it('adds new person', () => {
        return personsService.add({id: 22, name: 'test name', timezone: 3})
            .then(person => {
                expect(person._values.id).toBe(22);
                expect(person._values.name).toBe('test name');
                expect(person._values.timezone).toBe(3);
            });
    });
});