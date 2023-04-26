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

                const data = await UserModel.GetData(obj.user)
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
            let response = await UserModel.getBillingAddress(obj.info.user)


            if (response !== undefined) {
                await UserModel.EditBillingAddress(obj.data, obj.info.user)
            } else {
                obj.data.user = obj.info.user
                await UserModel.CreateBillingAddress(obj.data)
            }
        } else if (obj.info.type == 'Shipping') {
            let response = await UserModel.getShippingAdrres(obj.info.user)

            if (response !== undefined) {
                await UserModel.EditShippingAddress(obj.data, obj.info.user)

            } else {
                obj.data.user = obj.info.user
                await UserModel.CreateShippingAddress(obj.data)
            }
        }

        const response = await UserModel.GetData(obj.info.user)

        res.json(response)

    }

})

router.get('/edit/password/token/:token', async function (req, res, next) {
    const token = req.params.token
    if (token == process.env.api_key) {

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

    }



})


router.post('/edit/infopersonal/token/:token', async function (req, res, next) {
    const token = req.params.token
    var obj = JSON.parse(req.body.obj)
    if (token == process.env.api_key) {
        await UserModel.EditInfo(obj.data, obj.info.user)
    }
    const response = await UserModel.GetData(obj.info.user)

    res.json(response)


})

router.get('/checkemail/:email/token/:token', async function (req, res, next) {
    const email = req.params.email
    const token = req.params.token
    if (token === process.env.api_key) {
        const response = await UserModel.checkEmail(email)
        if (response === undefined) {
            console.log('no')
            res.json({
                'response': 'Email no registrado'
            })
        } else {
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

            await UserModel.ReloadauthCod(authCod, email)
            console.log( response.user)
            res.json({
                'response': 'Email Existente',
                user: response.user,
                authCod: authCod,
                timeAuthCod: timeAuthCod

            })

        }

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

router.post('/forgetpassword/token/:token', async function (req, res, next) {
    const token = req.params.token
    if (token === process.env.api_key) {
        const obj = JSON.parse(req.body.obj)
        console.log(obj)
        if (obj.newPass === obj.newPass2) {
            if (obj.newPass !== '') {


                const authCod = obj.authCod
                const user = obj.user
                const password = obj.newPass
                const response  = await UserModel.forgetpassword(user, password, authCod)
                if(response.affectedRows === 1){

                    res.json({status: 'contraseña cambiada'})
                    console.log('change password')
                    function generarCodigoAleatorio() {
                        var codigo = '';
                        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                        for (var i = 0; i < 8; i++) {
                            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
                        }
                        return codigo;
                    }
                    const NewAuthCod = generarCodigoAleatorio()

                    await UserModel.DiscardAuthCod(NewAuthCod, authCod)
                }else{
                    console.log('error en el token')
                    res.json({status: 'El Token a exipirado o ya fue usado, vuelve a solicitar el cambio de contraseña'})
                }


            } else {
                res.json({ error: 'contraseña vacia' })
            }

        } else {
            res.json({ error: 'no coniciden las contraseñas' })
        }

    }
})


router.get('/test', async function (req, res, next) {

})




module.exports = router;
