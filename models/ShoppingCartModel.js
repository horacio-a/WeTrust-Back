var pool = require('./bd');
var md5 = require('md5');

async function getShoppingCartByUser(username) {
    try {
        var query = 'select * from shopping_cart where user = ? ';
        var rows = await pool.query(query, [username]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function addShoppingCartRegister(obj) {
    try {
        var query = 'insert into shopping_cart set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function editQuatityById(quantity, name, talle) {
    try {
        var query = 'UPDATE shopping_cart SET quantity = ? WHERE name = ? and talle  = ?';
        var rows = await pool.query(query, [quantity, name, talle]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function deleteFromUser( name, talle) {
    try {
        var query = 'delete from shopping_cart WHERE name = ? and talle  = ?';
        var rows = await pool.query(query, [ name, talle]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function deleteAllFromUser(user) {
    try {
        var query = 'delete from shopping_cart where user = ?';
        var rows = await pool.query(query, [ user]);
        return rows;
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



module.exports = { getShoppingCartByUser, insertUsuario, addShoppingCartRegister ,editQuatityById, deleteAllFromUser, deleteFromUser}