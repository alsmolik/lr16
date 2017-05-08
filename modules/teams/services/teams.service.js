'use strict';

module.exports = class {
    constructor(teamsRepository) {
        this.teamsRepository = teamsRepository;
    }

    add(team) {
        return new Promise((resolve, reject) => {
            this.teamsRepository
                .build(team)
                .save()
                .then(resolve)
                .catch(err => reject({message: err.message}));
        })
    };
};