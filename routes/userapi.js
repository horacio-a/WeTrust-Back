var express = require('express');
var router = express.Router();
var UserModel = require('./../models/usersPage')
var md5 = require('md5');


router.post('/login/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {

        const obj = JSON.parse(req.body.obj)
        var usuarios = await UserModel.getUserByUsernameAndPassword(obj.user, obj.password)

        if (usuarios != undefined) {
            if (usuarios.confirmation === 1) {
                const shippingaddress = await UserModel.getShippingAdrres(obj.user)
                const billingaddress = await UserModel.getBillingAddress(obj.user)

                let data = {
                    "id": usuarios.id,
                    "user": usuarios.user,
                    "password": usuarios.password,
                    "address": usuarios.address,
                    "phone_number": usuarios.phone_number,
                    "talle_shoe": usuarios.talle_shoe,
                    "talle_clothing": usuarios.talle_clothing,
                    "email": usuarios.email,
                    "name": usuarios.name,
                    "lastname": usuarios.lastname,
                    'DNI': usuarios.DNI,
                    'birth_date': usuarios.birth_date,
                    'shippingaddress': shippingaddress,
                    'billingaddress': billingaddress
                }
                res.json([{ authenticated: true }, data])
            } else {
                res.json([{ authenticated: false, data: 'Cuenta no Confirmada, Confirmarlo en tu email' }])

            }


        } else (
            res.json([{ authenticated: false, data: 'No encontramos un usuario con esas credenciales' }])
        )


    } else (
        res.json('error')

    )
})


router.post('/IsUserRepeted/token/:token', async function (req, res, next) {
    const token = req.params.token
    if (token == process.env.api_key) {
        var obj = JSON.parse(req.body.obj)
        var UserState = await UserModel.checkUsername(obj.user)
        var UserMail = await UserModel.checkEmail(obj.email)
        var userRepeated
        var mailRepeated

        if (UserState === undefined) {
            userRepeated = false
        } else {
            userRepeated = true
        }
        if (UserMail === undefined) {
            mailRepeated = false
        } else {
            mailRepeated = true
        }

        if (userRepeated == true && mailRepeated == true) {
            res.json({
                state: true,
                data: 'Usuario y email ya utilizados'
            })
        }
        if (userRepeated == true && mailRepeated == false) {
            res.json({
                state: true,
                data: 'Usuario ya utilizado'
            })
        }
        if (userRepeated == false && mailRepeated == true) {
            res.json({
                state: true,
                data: 'Email ya utilizado'
            })
        }
        if (userRepeated == false && mailRepeated == false) {
            res.json({
                state: false,
                data: 'Usuario no esta repetido'
            })
        }


    } else {
        res.json('error')
    }

})




router.post('/create/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {

        const obj = JSON.parse(req.body.obj)
        delete obj.confirmEmail
        delete obj.confirmPassword
        obj.password = md5(obj.password)


        function generarCodigoAleatorio() {
            var codigo = '';
            var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < 8; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            return codigo;
        }

        obj.authCod = generarCodigoAleatorio()
        obj.timeAuthCod = Math.round(new Date().getTime() / 1000)


        var UserState = await UserModel.checkUsername(obj.user)
        var UserMail = await UserModel.checkEmail(obj.email)

        if (UserState === undefined) {
            userRepeated = true
        } else {
            userRepeated = false
        }
        if (UserMail === undefined) {
            mailRepeated = true
        } else {
            mailRepeated = false
        }


        if (userRepeated == true && mailRepeated == true) {
            if (obj.user != null && obj.email != null && obj.password != null) {
                if (obj.user != '' && obj.email != '' && obj.password != '') {
                    UserModel.insertUsuario(obj)
                    res.json({
                        data: 'Cuenta creada',
                        authCod: obj.authCod,
                        timeAuthCod: obj.timeAuthCod
                    })
                } else {
                    res.json('Error al crear la cuenta, asegurese de completar todos los campos')
                }

            }
        } else if (userRepeated == false && mailRepeated == true) {
            res.json('Elija otro nombre de usuario')
        } else if (mailRepeated == false && userRepeated == true) {
            res.json('Email ya registrado')
        } else if (mailRepeated == false && userRepeated == false) {
            res.json('usuario ya utilizado y Email ya registrado')
        }



    } else (
        res.json('error')

    )
})

router.get('/resendauthcod/email/:email/token/:token', async function (req, res, next) {
    const token = req.params.token
    const email = req.params.email

    if (token == process.env.api_key) {

        function generarCodigoAleatorio() {
            var codigo = '';
            var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            for (var i = 0; i < 8; i++) {
                codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
            }
            return codigo;
        }

        const authCod = generarCodigoAleatorio()
        const timeAuthCod = Math.round(new Date().getTime() / 1000)

        const user = await UserModel.getUser(email)
        await UserModel.ReloadauthCod(authCod, email)

        res.json({
            user: user.user,
            authCod: authCod,
            timeAuthCod: timeAuthCod
        })



    } else (
        res.json('error')

    )
})


router.get('/checkcod/email/:email/cod/:cod/token/:token', async function (req, res, next) {
    const token = req.params.token
    const cod = req.params.cod
    const email = req.params.email
    const check = await UserModel.checkAuthCod(email, cod)
    console.log(check)
    if (check !== undefined) {
        await UserModel.ConfimUser(email)
        res.json({
            confimation: true
        })
    } else {
        res.json({
            confimation: false
        })
    }
})



router.get('/modify/user/:user/password/:password/email/:email/token/:token', async function (req, res, next) {
    const token = req.params.token
    const user = req.params.user
    const email = req.params.email
    const password = req.params.password


    if (token == process.env.api_key) {



    } else (
        res.json('error')

    )
})


router.post('/edit/direccion/token/:token', async function (req, res, next) {
    const token = req.params.token
    var obj = JSON.parse(req.body.obj)
    if (token == process.env.api_key) {
        if (obj.info.type == 'Billing') {
            await UserModel.EditBillingAddress(obj.data, obj.info.user)
        } else if (obj.info.type == 'Shipping') {
            await UserModel.EditShippingAddress(obj.data, obj.info.user)
        }
        console.log(obj)
    }


})

router.get('/edit/password/token/:token', async function (req, res, next) {
    const token = req.params.token
    var obj = JSON.parse(req.headers.obj)
    var user = await UserModel.getUserByUsernameAndPassword(obj.info.user, obj.data.oldPass)
    console.log(user)
    if (obj.data.newPass1 === obj.data.newPass2) {
        if (user) {
            await UserModel.EditPassword(obj.data.newPass1, obj.info.user)
            res.json({ alteration: true, status: '200' })
        } else {
            res.json({ alteration: false, status: '400', msj: 'Contraseña incorrecta' })
        }

    } else {
        res.json({ alteration: false, status: '400', msj: 'No coinciden las contraseñas' })

    }




})


router.post('/edit/infopersonal/token/:token', async function (req, res, next) {
    const token = req.params.token
    var obj = JSON.parse(req.body.obj)
    if (token == process.env.api_key) {
        await UserModel.EditInfo(obj.data, obj.info.user)
    }


})


router.get('/getemail/user/:user/token/:token', async function (req, res, next) {
    const user = req.params.user
    const token = req.params.token
    if (token === process.env.api_key) {
        const email = await UserModel.getEmail(user)
        res.json({
            email
        })
    }


})



module.exports = router;
