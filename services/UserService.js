const db = require('../db');
const { v4: uuidv4 } = require('uuid');

const Query = {
    users: () => db.users.list()
}

const User = {
}


const Mutation = {
    returnStringByCreateUser: (root, args, context, info) => {
        const { firstname, lastname, role } = args.input;

        if (firstname.length > 15) {
            throw new Error("Le prénom est invalide.")
        }
        if (lastname.length > 15) {
            throw new Error("Le nom de famille est invalide.")
        }

        const res = db.users.create({
            id: uuidv4(),
            firstname: args.input.firstname,
            lastname: args.input.lastname,
            role: args.input.role,
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString()
        });

        return `${firstname} ${lastname} successfully created.`;
    },
    returnBooleanDeleteDataUserById: (root, args, context, info) => {
        const result = db.users.delete(args.token);
        return true
    },
    returnStringUpdateUserById: (root, args, context, info) => {
        const currentUser = db.users.get(args.id);
        const { firstname, lastname, role } = args.input;

        if (firstname != '') {
            currentUser.firstname = firstname;
        }
        if (lastname != '') {
            currentUser.lastname = lastname;
        }
        if (role != '') {
            currentUser.role = role;
        }

        const result = db.users.update(
            {
                id: args.id,
                firstname: currentUser.firstname,
                lastname: currentUser.lastname,
                role: currentUser.role,
                updated_at: new Date().toLocaleString(),
                created_at: args.created_at,
            });

        return `User #${args.id} successfully updated.`;
    },
}


module.exports = { Query, User, Mutation }