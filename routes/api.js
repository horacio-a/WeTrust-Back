var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var productosModel = require('./../models/productos')

router.get('/productos', async function (req, res, next) {
    var data = []
    let producto = await productosModel.GetProduct()
    let clothing_size = await productosModel.GetClothingSize()
    let shoe_size = await productosModel.GetShoeSize()
    for (let i = 0; i < producto.length; i++) {

        if (producto[i].category == 'clothing') {
            for (let index = 0; index < clothing_size.length; index++) {
                if (clothing_size[index].name == producto[i].name) {
                    const img = cloudinary.url(producto[index].img,) 
                    console.log(img)
                    data.push({
                        produto: producto[i],
                        img,
                        talles: clothing_size[index]
                    })

                } else {
                }
            }
        }
        if (producto[i].category == 'shoe') {
            for (let index = 0; index < shoe_size.length; index++) {
                if (shoe_size[index].name == producto[i].name) {
                    const img = cloudinary.url(producto[index].img,) 
                    data.push({
                        produto: producto[i],
                        img,
                        talles: shoe_size[index]
                    })

                } else {
                }
            }
        }
    }
    return res.json(data)


});





module.exports = router;
