var pool = require('./bd')


async function allRecursos(){
    var query = 'select * from recursos';
    var rows =  await pool.query(query);
    return rows;
}

async function getRecursosById(id) {
    var query = 'select * from recursos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
};

async function getRecursosRand() {
    var query = 'select * from recursos order by rand() limit 1 ';
    var rows = await pool.query(query);
    return rows[0];
};

async function insertRecursos(obj){
    try {
        var query = 'insert into recursos set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        console.log(error)
        throw(error)
    }

};


async function deleteRecursosById(id){
    var query = 'delete from recursos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows
};

async function modificarRecursosById(obj, id) {
    try{
        var query = 'update recursos set ? where id= ?';
        var rows = await pool.query(query, [obj, id]);
        console.log(rows)
        return rows;
    }
    catch (error){
        throw error;
    }
    
}

module.exports = {allRecursos, insertRecursos, getRecursosById, deleteRecursosById, modificarRecursosById, getRecursosRand}