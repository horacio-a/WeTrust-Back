// SDK de Mercado Pago
var express = require('express');
var router = express.Router();
const util = require('util');

const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
    access_token: process.env.access_token,
});

router.post('', async (req, res, next) => {
    const datos = JSON.parse(req.body.datos)
    const product = req.body.products.split('$/$').map((i) => { return JSON.parse(i) })
    console.log(datos)
    console.log(product)

    let items = []

    for (let i = 0; i < product.length; i++) {
        const element = product[i];
        items.push({
            title: element.title,
            picture_url: element.img,
            category_id: element.category_id,
            quantity: element.quantity,
            currency_id: 'ARS',
            unit_price: element.unit_price
        })
    }


    // Crea un objeto de preferencia
    let preference = {
        items: items,
        payer: {
            name: datos.name,
            surname: datos.surname,
            email: datos.email,
            phone: {
                area_code: datos.area_code,
                number: datos.number
            },
            address: {
                street_name: datos.street_name,
                street_number: datos.street_number,
                zip_code: datos.zip_code
            }
        },
        back_urls: {
            success: 'http://localhost:6969/sucesspay',
            pending: 'http://localhost:6969/pendingpay',
            failure: 'http://localhost:6969/failurepay'
        },
    };
    

    console.log(preference.payer.address.street_number)
    mercadopago.preferences
        .create(preference)
        .then(function (response) {
            console.log(response.body.id)
            res.json({
                global: response.body.id,
            })
        })
        .catch(function (error) {
            console.log(error);
        });

})



module.exports = router;
