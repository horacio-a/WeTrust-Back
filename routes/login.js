var express = require('express');
var router = express.Router();
var md5 = require('md5');
var loginModel = require('./../models/users')


router.get('/', function (req, res, next) {
    res.render('login/login', {
        title: 'Login'
    })
});

router.get('/logout', function (req, res, next){
    req.session.destroy();
    res.redirect('/login');

  })


router.post('/', async (req, res, next) => {
    try {
        var username = req.body.usuario;

        var password = req.body.password;

        var data = await loginModel.getUserByUsernameAndPassword(username, password);
        console.log(data)
        if (data != undefined) {
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            res.redirect('/inicio')
        } else {
            res.render('login/login', {
                error: true
            })
        }
    } catch (error) {
        res.render('login/login', {
            erro: true
        })
    }
})

router.get('/agregar', async function (req, res, next) {

    res.render('login/nuevousuario', {
    })
});


router.post('/agregar', async (req, res, next) => {
    try {
        var pass = ''
        var user = ''
        if (req.body.password != "" && req.body.usuario != "") {
            password = md5(req.body.password)
            username = req.body.usuario
            await loginModel.insertUsuario({
                password,
                username

            });
            res.redirect('/inicio')
        } else {
            res.render('login/nuevousuario', {
                error: true,
                message: "alguno de los campos requeridos no fue cargado"
            })
        }
    } catch (error) {
        console.log(error)
        res.render('login/nuevousuario', {
            error: true,
            message: "No se cargo con exito el equipo"
        })
    }
});


module.exports = router;
