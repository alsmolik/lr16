module.exports = class {
    constructor(personsRepository) {
        this.personsRepository = personsRepository;
    }

    getAll() {
        return new Promise((resolve, reject) => {
            this.personsRepository
                .findAndCountAll()
                .then(people => {
                    let wetTime = new Date(new Date().valueOf() + new Date().getTimezoneOffset() * 60000);
                    people.rows.forEach(person => {
                        person = person.toJSON();
                        let personDate = new Date(wetTime.valueOf() + person.timezone * 60 * 60000);
                        let personTime = Date.parse('01/01/2011 ' + personDate.getHours() + ':' + personDate.getMinutes() + ':' + personDate.getSeconds());
                        let personStartWorkTime = Date.parse('01/01/2011 ' + person.start_work_time);
                        let personEndWorkTime = Date.parse('01/01/2011 ' + person.end_work_time);
                        person.status = (personTime > personStartWorkTime && personTime < personEndWorkTime) ? 'works' : 'doesn\'t work';
                    });
                    return resolve(people);
                })
                .catch(err => reject(err));
        });
    };

    add(person) {
        return new Promise((resolve, reject) => {
            this.personsRepository
                .build(person)
                .save()
                .then(resolve)
                .catch(err => reject({message: err.message}));
        });
    };
};