var express = require('express');
var router = express.Router();
var PedidosModel = require('./../models/Pedidos')
var md5 = require('md5');



router.get('/user/:user/token/:token', async function (req, res, next) {
    const user = req.params.user
    const token = req.params.token
    if (token == process.env.api_key) {

        var resultado = []
        let orders = await PedidosModel.getInfoOrderByUser(user)
        console.log(orders)
        for (var property in orders) {
            let num_order = orders[property].num_order
            let products = await PedidosModel.getProductOrderBynumorder(num_order)
            let unitOrder = { PedidoData: orders[property], productos: products }
            resultado.push(unitOrder)
        }
        res.json(resultado)
    } else {

        res.json({ error: 'Authenticator' })
    }

})





router.post('/add/token/:token', async function (req, res, next) {
    const token = req.params.token
    if (token == process.env.api_key) {

        var obj = JSON.parse(req.body.obj)
        let data = obj.PedidoData
        let last_registrer = await PedidosModel.getOrdernum()
        let num_order = last_registrer[0].num_order + 1
        let PedidoData = {
            user: data.user,
            num_order: num_order,
            date: data.date,
            total: data.total,
            state: data.state,
            qtyProduct: data.qtyProduct,
            num_guia: data.num_guia,

        }
        await PedidosModel.addInfoOrder(PedidoData)
        for (var property in obj.product) {
            let element = obj.product[property]
            let subtotal = parseInt(element.price) * parseInt(element.quantity)
            let objeto = {
                user: element.user,
                num_order: num_order,
                name: element.name,
                quantity: element.quantity,
                img: element.img,
                category: element.category,
                price: element.price,
                subtotal: subtotal,
                size: element.talle
            }
            await PedidosModel.addProductOrder(objeto)

        }
    }


})



module.exports = router;
