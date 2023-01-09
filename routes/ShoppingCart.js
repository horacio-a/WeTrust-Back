var express = require('express');
var router = express.Router();
var ShoppingCartModel = require('./../models/ShoppingCartModel')
var md5 = require('md5');

router.get('/getInfo/user/:user/token/:token', async function (req, res, next) {
    const token = req.params.token
    if (token == process.env.api_key) {
        const user = req.params.user
        let producto = await ShoppingCartModel.getShoppingCartByUser(user)
        res.json(producto)
    }else{
        res.json({error: 'Authenticator'})
    }

})


router.get('/modifique', async function (req, res, next) {
    const token = req.params.token
    const username = req.params.user
    const password = req.params.password
    let producto = await ShoppingCartModel.editQuatityById(2, 1)
    res.send('respond with a resource');


})

router.post('/add/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {

        var obj = JSON.parse(req.body.obj) 
        let setproduct = await ShoppingCartModel.addShoppingCartRegister(obj)
        
    }else{
        
        res.json({error: 'Authenticator'})
    }



})

router.post('/update/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var obj = JSON.parse(req.body.obj) 
        await ShoppingCartModel.editQuatityById(obj.quantity, obj.name, obj.talle)
    }



})


router.post('/delete/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var obj = JSON.parse(req.body.obj) 
        await ShoppingCartModel.deleteFromUser(obj.name, obj.talle)
    }


    res.send('respond with a resource');

})



router.post('/deleteall/user/:user/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        const user = req.params.user
        let producto = await ShoppingCartModel.deleteAllFromUser(user)
    }

})




module.exports = router;
