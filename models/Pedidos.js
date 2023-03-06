var pool = require('./bd');
var md5 = require('md5');

async function getInfoOrder() {
    try {
        var query = 'select * from info_orders  ';
        var rows = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getInfoOrderByUser(user) {
    try {
        var query = 'select * from info_orders where user = ? ';
        var rows = await pool.query(query, [user]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}


async function inicioActividades() {
    try {
        var query = 'select date from info_orders ORDER BY date DESC limit 1';
        var rows = await pool.query(query);
        return rows[0].date;
    } catch (error) {
        console.log(error);
    }
}

async function getInfoOrderBydate(date) {
    try {
        var query = 'select * from info_orders where date = ? ';
        var rows = await pool.query(query, [date]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

async function getInfoOrderByNumOrder(num_order) {
    try {
        var query = 'select * from info_orders where num_order = ? ';
        var rows = await pool.query(query, [num_order]);
        return rows[0];
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


async function UptadeNumGuia(num_guia, num_order) {
    try {
        var query = 'UPDATE `info_orders` SET `num_guia` = ? WHERE num_order = ?;';
        var rows = await pool.query(query, [num_guia, num_order]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}

async function UptadeState(state, num_order) {
    try {
        var query = 'UPDATE `info_orders` SET `state` = ? WHERE num_order = ?;';
        var rows = await pool.query(query, [state, num_order]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}




module.exports = {inicioActividades, UptadeState, UptadeNumGuia, getInfoOrderByNumOrder, getInfoOrder, getInfoOrderBydate, getInfoOrderByUser, getProductOrderBynumorder, addInfoOrder, addProductOrder, getOrdernum }