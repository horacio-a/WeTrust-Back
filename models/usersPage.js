var pool = require('./bd');
var md5 = require('md5');

async function getUserByUsernameAndPassword(username, password) {
    try {
        var query = 'select * from userweb where user = ? and password = ? limit 1';
        var rows = await pool.query(query, [username, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function checkUsername(username) {
    try {
        var query = 'select * from userweb where user = ?';
        var rows = await pool.query(query, [username]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function checkEmail(email) {
    try {
        var query = 'select * from userweb where email = ?';
        var rows = await pool.query(query, [email]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}


async function insertUsuario(obj) {
    try {
        var query = 'insert into userweb set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error)
        throw (error)
    }

};



module.exports = { getUserByUsernameAndPassword, insertUsuario, checkUsername ,checkEmail}