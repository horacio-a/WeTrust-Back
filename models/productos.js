var pool = require('./bd')

//                      //
//                      //
//   Query Productos    //
//                      //
//                      //


async function GetProduct() {
    var query = 'select * from productos';
    var rows = await pool.query(query);
    return rows;
};

async function CreateProduct(obj) {
    try {
        var query = 'insert into productos set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        throw (error)
    }
};

async function deleteProductById(id) {
    var query = 'delete from productos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows
};


async function getProductById(id) {
    var query = 'select * from productos where id = ?';
    var rows = await pool.query(query, [id]);
    return rows[0];
};

async function modificarProductById(obj, id) {
    try {
        var query = 'update productos set ? where id= ?';
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }
    catch (error) {
        throw error;
    }

}
//                      //
//                      //
//   Query Productos    //
//                      //
//                      //

//                      //
//                      //
//   Query shoe_size    //
//                      //
//                      //



async function GetShoeSize() {
    var query = 'select * from shoe_size';
    var rows = await pool.query(query);
    return rows;
};

async function CreateShoeSize(obj) {
    try {
        var query = 'insert into shoe_size set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        throw (error)
    }
};

async function deleteShoeSizeById(name) {
    var query = 'delete from shoe_size where name = ?';
    var rows = await pool.query(query, [name]);
    return rows
};


async function getShoeSizeById(name) {
    var query = 'select * from shoe_size where name = ?';
    var rows = await pool.query(query, [name]);
    return rows[0];
};

async function modificarShoeSizeById(obj, name) {
    try {
        var query = 'update shoe_size set ? where name= ?';
        var rows = await pool.query(query, [obj, name]);
        return rows;
    }
    catch (error) {
        throw error;
    }

}


//                      //
//                      //
//   Query shoe_size    //
//                      //
//                      //


//                      //
//                      //
//  Query clothing_size //
//                      //
//                      //



async function GetClothingSize() {
    var query = 'select * from clothing_size';
    var rows = await pool.query(query);
    return rows;
};

async function CreateClothingSize(obj) {
    try {
        var query = 'insert into clothing_size set ? ';
        var rows = await pool.query(query, [obj])
        return rows;
    } catch (error) {
        throw (error)
    }
};

async function deleteClothingSizeById(name) {
    var query = 'delete from clothing_size where name = ?';
    var rows = await pool.query(query, [name]);
    return rows
};


async function getClothingSizeById(name) {
    var query = 'select * from clothing_size where name = ?';
    var rows = await pool.query(query, [name]);
    return rows[0];
};

async function modificarClothingSizeById(obj, name) {
    try {
        var query = 'update clothing_size set ? where name= ?';
        var rows = await pool.query(query, [obj, name]);
        return rows;
    }
    catch (error) {
        throw error;
    }

}


//                      //
//                      //
//   Query shoe_size    //
//                      //
//                      //




module.exports = {
    GetProduct, CreateProduct, getProductById, modificarProductById, deleteProductById,
    GetShoeSize, CreateShoeSize, getShoeSizeById, modificarShoeSizeById, deleteShoeSizeById,
    GetClothingSize, CreateClothingSize, getClothingSizeById, modificarClothingSizeById, deleteClothingSizeById
}
