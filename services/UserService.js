const db = require('../db');

const Query = {
    users: () => db.users.list()
}

const User = {
}


module.exports = { Query, User }