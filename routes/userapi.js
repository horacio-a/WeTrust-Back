var express = require('express');
var router = express.Router();
var UserModel = require('./../models/usersPage')
var md5 = require('md5');


router.get('/login/user/:user/password/:password/token/:token', async function (req, res, next) {
    const token = req.params.token
    const username = req.params.user
    const password = req.params.password
    if (token == process.env.api_key) {
        var usuarios = await UserModel.getUserByUsernameAndPassword(username, password)
        if (usuarios != undefined) {
            const shippingaddress = await UserModel.getShippingAdrres(username)
            const billingaddress = await UserModel.getBillingAddress(username)

            let data = {
                "id": usuarios.id,
                "user": usuarios.user ,
                "password": usuarios.password ,
                "address": usuarios.address ,
                "phone_number": usuarios.phone_number ,
                "talle_shoe": usuarios.talle_shoe ,
                "talle_clothing": usuarios.talle_clothing,
                "email": usuarios.email ,
                "name": usuarios.name ,
                "lastname": usuarios.lastname ,
                'shippingaddress': shippingaddress,
                'billingaddress': billingaddress

            }
            res.json([{ authenticated: true }, data])

        } else (
            res.json([{ authenticated: false }])
        )


    } else (
        res.json('error')

    )
})

router.get('/create/user/:user/password/:password/email/:email/token/:token', async function (req, res, next) {
    const token = req.params.token
    const user = req.params.user
    const email = req.params.email
    const password = req.params.password

    var UserState = await UserModel.checkUsername(user)
    var UserMail = await UserModel.checkEmail(email)

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


    if (token == process.env.api_key) {
        if (userRepeated == true && mailRepeated == true) {
            if (user != null && email != null && password != null) {
                if (user != '' && email != '' && password != '') {
                    var data = { 'user': user, 'password': md5(password), 'email': email }
                    UserModel.insertUsuario(data)
                    res.json('Cuenta creada')
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


router.post('/edit/direccion/token/:token', async function (req, res, next){
    const token = req.params.token
    var obj = JSON.parse(req.body.obj)
    if(token == process.env.api_key){
        if(obj.info.type == 'Billing'){
            await UserModel.EditBillingAddress(obj.data, obj.info.user)
        }else if (obj.info.type == 'Shipping'){
            await UserModel.EditShippingAddress(obj.data, obj.info.user)
        }
        console.log(obj)
    }


})



module.exports = router;
