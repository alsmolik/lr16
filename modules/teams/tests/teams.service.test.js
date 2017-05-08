const SequelizeMock = require('sequelize-mock');
const DBConnectionMock = new SequelizeMock();

const TeamMock = DBConnectionMock.define('Team',
    {
        'id': 1,
        'name': 'BSTU'
    }
);

let teamsService = new (require('../services/teams.service'))(TeamMock);

describe('add', () => {
    it('adds new team', () => {
        return teamsService.add({id: 2, name: 'Telegram'})
            .then(team => {
                expect(team._values.id).toBe(2);
                expect(team._values.name).toBe('Telegram');
            });
    });
});