module.exports = class {
    constructor(contactsRepository, personsRepository) {
        this.contactsRepository = contactsRepository;
        this.personsRepository = personsRepository;
    }

    add(person1_id, person2_id) {
        return this.contactsRepository
            .build({person1_id: person1_id, person2_id: person2_id})
            .save();
    }

    get(id) {
        let user_start_work_time, user_end_work_time;

        return this.personsRepository
            .findOne({where: {id: id}})
            .then(person => {
                let result = {};
                result.id = person.id;
                result.name = person.name;
                result.timezone = person.timezone;
                result.start_work_time = person.start_work_time;
                result.end_work_time = person.end_work_time;
                result.contacts = [];

                user_start_work_time = new Date(Date.parse('01/01/2011 ' + person.start_work_time).valueOf() - person.timezone * 60 * 60000);
                user_end_work_time = new Date(Date.parse('01/01/2011 ' + person.end_work_time).valueOf() - person.timezone * 60 * 60000);

                return Promise.resolve(result);
            })
            .then(result => {
                return this.contactsRepository
                    .findAll({where: {person1_id: id}, include: [this.personsRepository]})
                    .then(contacts => {
                        contacts.forEach(contact => {
                            let person = contact.Person.toJSON();
                            let person_start_work_time = new Date(Date.parse('01/01/2011 ' + person.start_work_time).valueOf() - person.timezone * 60 * 60000);
                            let person_end_work_time = new Date(Date.parse('01/01/2011 ' + person.end_work_time).valueOf() - person.timezone * 60 * 60000);

                            if (person_start_work_time > user_start_work_time)
                                person.joint_working_hours = person_start_work_time.getHours() + ':' + person_start_work_time.getMinutes();
                            else
                                person.joint_working_hours = user_start_work_time.getHours() + ':' + user_start_work_time.getMinutes();

                            if (person_end_work_time > user_end_work_time)
                                person.joint_working_hours += ' - ' + user_end_work_time.getHours() + ':' + user_end_work_time.getMinutes() + ' UTC0';
                            else
                                person.joint_working_hours += ' - ' + person_end_work_time.getHours() + ':' + person_end_work_time.getMinutes() + ' UTC0';

                            result.contacts.push(person);
                        });

                        return Promise.resolve(result);
                    });
            });
    }
};