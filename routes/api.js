var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var productosModel = require('./../models/productos')

router.get('/productos/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProduct()

        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()
        for (let i = 0; i < producto.length; i++) {
            console.log(producto[i].category)
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)
                        console.log(img)
                        console.log(data)
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
                        console.log(shoe_size[index].name + ' --- ' + producto[i].name)
                        const img = cloudinary.url(producto[i].img,)

                        data.push({
                            produto: producto[i],
                            img,
                            talles: shoe_size[index]
                        })
                        break
                    } else {
                        console.log(shoe_size[index].name + ' --- ' + producto[i].name + ' ---but not push')
                    }
                }
            }
        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }


});

router.get('/productos/destacados/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProduct()

        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()
        for (let i = 0; i < producto.length; i++) {
            console.log(producto[i].category)
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)
                        if(producto[i].name == 'FOG Essentials Hoodie Coral' || producto[i].name == 'Nike Big Swoosh Reversible Hemp White' || producto[i].name == 'Jordan x DJ Khaled Shorts Crimson Bliss' || producto[i].name == 'Palace x Umbro Classic Jersey Flint Stone'){
                            data.push({
                                produto: producto[i],
                                img,
                                talles: clothing_size[index]
                            })
                        }
                    } else {
                    }
                }
            }
            if (producto[i].category == 'shoe') {
                for (let index = 0; index < shoe_size.length; index++) {
                    if (shoe_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)
                        if(producto[i].name == 'Jordan 4 A Ma Maniére Violet Ore' || producto[i].name == 'Jordan 1 Retro Travis Scott Reverse Mocha' || producto[i].name == 'Jordan 1 Retro Low OG SP Travis Scott' || producto[i].name == 'Jordar 1 low  Fragment x Travis Scott'){
                            data.push({
                                produto: producto[i],
                                img,
                                talles: shoe_size[index]
                            })
                            break
                        }
                    } else {
                    }
                }
            }
        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }


});

router.get('/productos/:token/:id', async function (req, res, next) {
    const token = req.params.token
    const id = req.params.id

    if (token == process.env.api_key) {
        var data = []
        var articulo = await productosModel.getProductById(id)
        if(articulo.category == 'shoe'){
            var talles =await productosModel.getShoeSizeById(articulo.name)
        }
        if(articulo.category == 'clothing'){
            var talles =await productosModel.getClothingSizeById(articulo.name)
        }
        const img = cloudinary.url(articulo.img)
        data.push({
            producto: articulo,
            img,
            talles: talles

        })
        res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }


});



module.exports = router;
