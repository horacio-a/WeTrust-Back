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

async function getEmail(username) {
    try {
        var query = 'select email from userweb where user = ?';
        var rows = await pool.query(query, [username]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}



async function getUser(Email) {
    try {
        var query = 'select user from userweb where email = ?';
        var rows = await pool.query(query, [Email]);
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


async function checkPassword(password) {
    try {
        var query = 'select * from userweb where password = ?';
        var rows = await pool.query(query, md5(password));
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function EditPassword(password, user) {
    try {
        var query = 'update userweb set password = ? where user = ?';
        var rows = await pool.query(query, [md5(password), user]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}

async function EditInfo(obj, user) {
    try {
        var query = 'update userweb set ? where user= ?';
        var rows = await pool.query(query, [obj, user]);
        return rows;
    }
    catch (error) {
        throw error;
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




async function checkAuthCod(email, cod) {
    try {
        var query = 'select * from userweb where email = ? and authCod = ? limit 1';
        var rows = await pool.query(query, [email, cod]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function ConfimUser(email) {
    try {
        var query = 'update userweb set confirmation = 1 where email = ?';
        var rows = await pool.query(query, [email]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}

// ------------------ billing and shipping ---------------------------//




async function EditBillingAddress(obj, user) {
    try {
        var query = 'update billingaddress set ? where user = ?';
        var rows = await pool.query(query, [obj, user]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}




async function EditShippingAddress(obj, user) {
    try {
        var query = 'update shippingaddress set ? where user = ?';
        var rows = await pool.query(query, [obj, user]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}



async function CreateShippingAddress(obj) {
    try {
        var query = 'INSERT INTO shippingaddress set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}




async function CreateBillingAddress(obj) {
    try {
        var query = 'insert into billingaddress set ?';
        var rows = await pool.query(query, [obj]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}



async function getShippingAdrres(username) {
    try {
        var query = 'select * from shippingaddress where user = ? limit 1';
        var rows = await pool.query(query, [username]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

async function getBillingAddress(username) {
    try {
        var query = 'select * from billingaddress where user = ? limit 1';
        var rows = await pool.query(query, [username]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}




// ------------------ billing and shipping ---------------------------//





async function deleteUsuario(user) {
    var query = 'delete from userweb where user = ?';
    var rows = await pool.query(query, [user]);
    return rows
};


async function deleteBillingAddress(user) {
    var query = 'delete from userweb where user = ?';
    var rows = await pool.query(query, [user]);
    return rows
};


async function deleteShippingAddress(user) {
    var query = 'delete from userweb where user = ?';
    var rows = await pool.query(query, [user]);
    return rows
};



async function ReloadauthCod(authCod, email) {
    try {
        var query = 'update userweb set authCod = ? where email = ?';
        var rows = await pool.query(query, [authCod, email]);
        return rows;
    }
    catch (error) {
        throw error;
    }
}





module.exports = {ConfimUser, CreateShippingAddress, CreateBillingAddress,  getEmail, getUser,  checkAuthCod, checkPassword,EditInfo,ReloadauthCod, EditPassword, deleteUsuario, EditShippingAddress, EditBillingAddress, getShippingAdrres,getBillingAddress, getUserByUsernameAndPassword, insertUsuario, checkUsername ,checkEmail}
