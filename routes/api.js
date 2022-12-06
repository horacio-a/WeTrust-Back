var express = require('express');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var productosModel = require('./../models/productos')

router.get('/productos/:token', async function (req, res, next) {
    const token = req.params.token

    if(token == process.env.api_key){
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
                        console.log(shoe_size[index].name+ ' --- ' + producto[i].name)
                        const img = cloudinary.url(producto[i].img,) 
    
                        data.push({
                            produto: producto[i],
                            img,
                            talles: shoe_size[index]
                        })
                        break
                    } else {
                        console.log(shoe_size[index].name+ ' --- ' + producto[i].name + ' ---but not push')
                    }
                }
            }
        }
        return res.json(data)
    }else{
        return res.json({
            error: 'error apikey'
        })
    }


});





module.exports = router;
