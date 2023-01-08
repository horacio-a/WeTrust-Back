var pool = require('./bd');
var md5 = require('md5');

async function getInfoOrderByUser(user) {
    try {
        var query = 'select * from info_orders where user = ? ';
        var rows = await pool.query(query, [user]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getProductOrderBynumorder(num_order) {
    try {
        var query = 'select * from product_orders where num_order = ? ';
        var rows = await pool.query(query, [num_order]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function addInfoOrder(obj) {
    try {
        var query = 'insert into info_orders set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function addProductOrder(obj) {
    try {
        var query = 'insert into product_orders set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


async function getOrdernum() {
    try {
        var query = 'select * from info_orders order by num_order desc limit 1';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}




module.exports = { getInfoOrderByUser, getProductOrderBynumorder, addInfoOrder ,addProductOrder, getOrdernum}