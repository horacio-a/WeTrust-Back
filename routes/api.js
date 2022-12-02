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
        console.log(producto[i].name)
        if (producto[i].category == 'clothing') {
            for (let index = 0; index < clothing_size.length; index++) {
                if (clothing_size[index].name == producto[i].name) {
                    data.push({
                        produto: producto[i],
                        talles: clothing_size[index]
                    })

                } else {
                }
            }
        }
        if (producto[i].category == 'shoe') {
            for (let index = 0; index < shoe_size.length; index++) {
                if (shoe_size[index].name == producto[i].name) {
                    data.push({
                        produto: producto[i],
                        talles: shoe_size[index]
                    })

                } else {
                }
            }
        }
    }
    console.log(data)
    return res.json(data)


});

router.get('/recursos/id/:id', async function (req, res, next) {
    var id = req.params.id;
    var recursos = await recursosModel.getRecursosById(id)
    if (typeof recursos !== 'undefined') {
        if (recursos.img_muestra) {
            recursos.img_muestra = cloudinary.url(recursos.img_muestra, {
                crop: 'crop'
            });
        } else {
            recursos.img_muestra = ''
        }

        if (recursos.img_codejs) {
            recursos.img_codejs = cloudinary.url(recursos.img_codejs, {
                crop: 'crop'
            });
        } else {
            recursos.img_codejs = 'https://res.cloudinary.com/dioe9ktns/image/upload/v1664126222/DefaultJS_d8oahk.png'
        }

        if (recursos.img_codecss) {
            recursos.img_codecss = cloudinary.url(recursos.img_codecss, {
                crop: 'crop'
            });
        } else {
            recursos.img_codecss = 'https://res.cloudinary.com/dioe9ktns/image/upload/v1664126222/DefaultCSS_eh7fxh.png'
        }


        if (recursos.img_codehtml) {
            recursos.img_codehtml = cloudinary.url(recursos.img_codehtml, {
                crop: 'crop'
            });
        } else {
            recursos.img_codehtml = 'https://res.cloudinary.com/dioe9ktns/image/upload/v1664126222/DefaultHMTL_prj7ym.png'
        }


        return res.json(recursos)
    }
    return res.json({
        mensaje: 'id no encontrado'
    })


});


router.get('/recursos/aleatorio', async function (req, res, next) {

    var recursos = await recursosModel.getRecursosRand()
    if (typeof recursos !== 'undefined') {
        if (recursos.img_muestra) {
            recursos.img_muestra = cloudinary.url(recursos.img_muestra, {
                crop: 'crop'
            });
        } else {
            recursos.img_muestra = ''
        }

        if (recursos.img_codejs) {
            recursos.img_codejs = cloudinary.url(recursos.img_codejs, {
                crop: 'crop'
            });
        } else {
            recursos.img_codejs = 'https://res.cloudinary.com/dioe9ktns/image/upload/v1664126222/DefaultJS_d8oahk.png'
        }

        if (recursos.img_codecss) {
            recursos.img_codecss = cloudinary.url(recursos.img_codecss, {
                crop: 'crop'
            });
        } else {
            recursos.img_codecss = 'https://res.cloudinary.com/dioe9ktns/image/upload/v1664126222/DefaultCSS_eh7fxh.png'
        }


        if (recursos.img_codehtml) {
            recursos.img_codehtml = cloudinary.url(recursos.img_codehtml, {
                crop: 'crop'
            });
        } else {
            recursos.img_codehtml = 'https://res.cloudinary.com/dioe9ktns/image/upload/v1664126222/DefaultHMTL_prj7ym.png'
        }


        return res.json(recursos)
    }



});



module.exports = router;
