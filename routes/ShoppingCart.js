var express = require('express');
var router = express.Router();
var ShoppingCartModel = require('./../models/ShoppingCartModel')
var md5 = require('md5');

router.get('/getInfo/user/:user', async function (req, res, next) {
    const user = req.params.user
    let producto = await ShoppingCartModel.getShoppingCartByUser(user)
    res.json(producto)


})


router.get('/modifique', async function (req, res, next) {
    const token = req.params.token
    const username = req.params.user
    const password = req.params.password
    let producto = await ShoppingCartModel.editQuatityById(2, 1)
    res.send('respond with a resource');


})

router.post('/add', async function (req, res, next) {
    var obj = JSON.parse(req.body.obj) 
    let setproduct = await ShoppingCartModel.addShoppingCartRegister(obj)
    

})

router.post('/update', async function (req, res, next) {
    var obj = JSON.parse(req.body.obj) 
    await ShoppingCartModel.editQuatityById(obj.quantity, obj.name, obj.talle)
    res.send('respond with a resource');

})


router.post('/delete', async function (req, res, next) {
    var obj = JSON.parse(req.body.obj) 
    await ShoppingCartModel.deleteFromUser(obj.name, obj.talle)
    res.send('respond with a resource');

})



router.post('/deleteall/user/:user', async function (req, res, next) {
    const user = req.params.user
    let producto = await ShoppingCartModel.deleteAllFromUser(user)
})




module.exports = router;
