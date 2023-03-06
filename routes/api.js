var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var productosModel = require('./../models/productos')
var ventasModel = require('../models/Pedidos')

router.get('/productos/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProduct()

        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()
        for (let i = 0; i < producto.length; i++) {
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)

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
                        const img = cloudinary.url(producto[i].img,)

                        data.push({
                            produto: producto[i],
                            img,
                            talles: shoe_size[index]
                        })
                        break
                    } else {
                    }
                }
            }
            if (producto[i].category == 'accessories') {

                const img = cloudinary.url(producto[i].img,)

                data.push({
                    produto: producto[i],
                    img,
                })

            }

        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }


});
router.get('/onlyproductos/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProduct()


        return res.json(producto)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }


});




router.get('/productos/destacados/token/:token', async function (req, res, next) {
    const token = req.params.token

    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProduct()
        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()
        for (let i = 0; i < producto.length; i++) {
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)
                        if (producto[i].name == 'FOG Essentials Hoodie Coral' || producto[i].name == 'Nike Big Swoosh Reversible Hemp White' || producto[i].name == 'Jordan x DJ Khaled Shorts Crimson Bliss' || producto[i].name == 'Palace x Umbro Classic Jersey Flint Stone') {
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
                        if (producto[i].name == 'Jordan 4 A Ma Maniére Violet Ore' ||
                            producto[i].name == 'Jordan 1 low Fragment x Travis Scott' ||
                            producto[i].name == 'Jordan 1 Retro Travis Scott Reverse Mocha' ||
                            producto[i].name == 'Jordan 1 Retro Low OG SP Travis Scott') {

                            data.push({
                                produto: producto[i],
                                img,
                                talles: shoe_size[index]
                            })
                            break
                        } else {
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

router.get('/productos/id/:id/token/:token', async function (req, res, next) {
    const token = req.params.token
    const id = req.params.id

    if (token == process.env.api_key) {
        var data = []
        var articulo = await productosModel.getProductById(id)
        if (articulo.category == 'shoe') {
            var talles = await productosModel.getShoeSizeById(articulo.name)
        }
        if (articulo.category == 'clothing') {
            var talles = await productosModel.getClothingSizeById(articulo.name)
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


router.get('/productos/category/:category/token/:token/', async function (req, res, next) {
    const token = req.params.token
    const category = req.params.category


    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProductBycategory(category)

        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()

        for (let i = 0; i < producto.length; i++) {
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)

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
                        const img = cloudinary.url(producto[i].img,)

                        data.push({
                            produto: producto[i],
                            img,
                            talles: shoe_size[index]
                        })
                        break
                    } else {
                    }
                }
            }
            if (producto[i].category == 'accessories') {

                const img = cloudinary.url(producto[i].img,)

                data.push({
                    produto: producto[i],
                    img,
                })

            }

        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }

});


router.get('/productos/subcategory/:subcategory/token/:token/', async function (req, res, next) {
    const token = req.params.token
    const subcategory = req.params.subcategory


    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProductBysubcategory(subcategory)

        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()

        for (let i = 0; i < producto.length; i++) {
            console.log(producto[i].category)
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)
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
            if (producto[i].category == 'accessories') {

                const img = cloudinary.url(producto[i].img,)

                data.push({
                    produto: producto[i],
                    img,
                })

            }

        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }

});

router.get('/productos/marca/:marca/token/:token/', async function (req, res, next) {
    const token = req.params.token
    const marca = req.params.marca


    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProductByBrand(marca)

        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()

        for (let i = 0; i < producto.length; i++) {
            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)

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
                        const img = cloudinary.url(producto[i].img,)

                        data.push({
                            produto: producto[i],
                            img,
                            talles: shoe_size[index]
                        })
                        break
                    } else {
                    }
                }
            }
            if (producto[i].category == 'accessories') {

                const img = cloudinary.url(producto[i].img,)

                data.push({
                    produto: producto[i],
                    img,
                })

            }

        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }

});


router.get('/productos/category/:category/product/:product/token/:token/', async function (req, res, next) {
    const token = req.params.token
    const category = req.params.category
    const product = req.params.product

    console.log(category)
    if (token == process.env.api_key) {
        var data = []
        let producto = await productosModel.GetProductBySearch(product, category)
        let clothing_size = await productosModel.GetClothingSize()
        let shoe_size = await productosModel.GetShoeSize()

        for (let i = 0; i < producto.length; i++) {

            if (producto[i].category == 'clothing') {
                for (let index = 0; index < clothing_size.length; index++) {
                    if (clothing_size[index].name == producto[i].name) {
                        const img = cloudinary.url(producto[i].img,)

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
                        const img = cloudinary.url(producto[i].img,)

                        data.push({
                            produto: producto[i],
                            img,
                            talles: shoe_size[index]
                        })
                        break
                    } else {
                    }
                }
            }
            if (producto[i].category == 'accessories') {

                const img = cloudinary.url(producto[i].img,)

                data.push({
                    produto: producto[i],
                    img,
                })

            }

        }
        return res.json(data)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }

});



router.get('/marcas/token/:token', async function (req, res, next) {
    const token = req.params.token


    if (token == process.env.api_key) {
        var marca = await productosModel.GetMarca()
        var data = []
        marca.map(item => {
            data.push(item.marca)


        })

        const result = data.reduce((acc, item) => {
            if (!acc.includes(item)) {
                acc.push(item);
            }
            return acc;
        }, [])


        return res.json(result)
    } else {
        return res.json({
            error: 'error apikey'
        })
    }

});



router.get('/dataset/quantity/token/:token', async function (req, res, next) {
    function lastSevenDays() {
        const today = new Date();
        const lastSevenDays = [];

        for (let i = 0; i < 7; i++) {
            const previousDay = new Date(today);
            previousDay.setDate(previousDay.getDate() - i);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
            var dia = previousDay.toLocaleDateString('es-mx', options).split(', ')[1];

            lastSevenDays.push(dia);
        }

        return lastSevenDays;
    };
    var weekly = lastSevenDays().reverse()
    var obj = { data: [], promedio: 0 }
    var contador = 0
    var allData = await ventasModel.getInfoOrder()
    var inicioActividades = await ventasModel.inicioActividades()

    function daysSinceJan5th2023({ day, month, year }) {
        let today = new Date();
        let formatDay = new Date(year, month, day);
        let diffTime = today - formatDay;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    function getDateFromString(dateString) {
        const [day, de, month, de2, year] = dateString.split(" ");
        const fullMonth = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        return {
            day: parseInt(day),
            month: fullMonth.indexOf(month),
            year: parseInt(year)
        };
    }

    var DiasDesdeInicio = daysSinceJan5th2023(getDateFromString(inicioActividades))
    console.log()



    for (let i = 0; i < weekly.length; i++) {
        const e = weekly[i];
        var data = await ventasModel.getInfoOrderBydate(e)
        contador = contador + data.length
        var a = { labels: e, datasets: data.length }
        obj.data.push(a)
    }

    obj.promedio = allData.length / DiasDesdeInicio

    return res.json(obj)

});



router.get('/dataset/money/token/:token', async function (req, res, next) {
    function lastSevenDays() {
        const today = new Date();
        const lastSevenDays = [];

        for (let i = 0; i < 7; i++) {
            const previousDay = new Date(today);
            previousDay.setDate(previousDay.getDate() - i);
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' }
            var dia = previousDay.toLocaleDateString('es-mx', options).split(', ')[1];

            lastSevenDays.push(dia);
        }

        return lastSevenDays;
    };
    var weekly = lastSevenDays().reverse()
    var obj = { data: [], promedio: 0 }
    var contador = 0
    var allData = await ventasModel.getInfoOrder()

    for (let x = 0; x < allData.length; x++) {
        const element = allData[x];
        contador = contador + element.total
    }

    for (let i = 0; i < weekly.length; i++) {
        let totalmoney = 0
        const e = weekly[i];
        var data = await ventasModel.getInfoOrderBydate(e)

        for (let inx = 0; inx < data.length; inx++) {
            const element = data[inx];
            totalmoney = element.total + totalmoney
        }
        var a = { labels: e, datasets: totalmoney }
        obj.data.push(a)
    }

    var inicioActividades = await ventasModel.inicioActividades()

    function daysSinceJan5th2023({ day, month, year }) {
        let today = new Date();
        let formatDay = new Date(year, month, day);
        let diffTime = today - formatDay;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    function getDateFromString(dateString) {
        const [day, de, month, de2, year] = dateString.split(" ");
        const fullMonth = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        return {
            day: parseInt(day),
            month: fullMonth.indexOf(month),
            year: parseInt(year)
        };
    }

    var DiasDesdeInicio = daysSinceJan5th2023(getDateFromString(inicioActividades))



    obj.promedio = contador / DiasDesdeInicio

    return res.json(obj)

});


module.exports = router;
