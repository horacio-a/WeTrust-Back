var express = require('express');
var router = express.Router();
var porductoModel = require('../models/productos')
var ventasModel = require('../models/Pedidos')
const util = require('util');
const cloudinary = require('cloudinary').v2;
const uploader = util.promisify(cloudinary.uploader.upload);



router.get('/', async function (req, res, next) {
  var orders = await ventasModel.getInfoOrder()
  var Alltotal = 0
  var allSales = 0
  var weeklySales = 0
  var weeklyTotal = 0
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
  var weekly = lastSevenDays()

  for (let i = 0; i < orders.length; i++) {
    const e = orders[i];

    for (let i = 0; i < weekly.length; i++) {
      const element = weekly[i];
      if(e.date == element){
        weeklyTotal = e.total + weeklyTotal
        weeklySales = weeklySales + 1
      }
      

    }

    Alltotal = e.total + Alltotal
    allSales = allSales + 1
  }


  weeklyTotal = weeklyTotal.toLocaleString('en-IN', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })
  Alltotal = Alltotal.toLocaleString('en-IN', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })


  res.render('ventas/admin', {
    title: 'Ventas',
    layout: 'ventas/layout',
    orders,
    Alltotal,
    allSales,
    weeklySales,
    weeklyTotal
  })
});



router.get('/num_order/:id', async (req, res, next) => {
  try {
    var id = req.params.id;

    let order = await ventasModel.getInfoOrderByNumOrder(id)
    let product = await ventasModel.getProductOrderBynumorder(id)
  
    for (let i = 0; i < product.length; i++) {
      product[i].img = cloudinary.url(product[i].img,)
    }
    let num_guia = order.num_guia
    let status = 0
    if(num_guia != 0){
      status = false
    }else{
      status =true 
    }
      res.render('ventas/ventaID', {
      order,
      product,
      status,
  
    })
  } catch (error) {
    res.redirect('/ventas'),{
      layout: 'ventas/layout'
    }
  }
});

router.post('/addnum_order', async (req, res, next) => {

  let num_guia = req.body.num_guia
  let num_order = req.body.num_order
  let state = 'Enviado'

  await ventasModel.UptadeState(state, num_order)

  await ventasModel.UptadeNumGuia(num_guia, num_order)

  // Hacer que el status se actualice dependiendo lo que diga la api de andriani
  res.redirect('/ventas'),{
    layout: 'ventas/layout'
  }
});


router.post('/refresh', async (req, res, next ) =>{
  let num_guia = req.body.num_guia
  let num_order = req.body.num_order

  let order = await ventasModel.getInfoOrderByNumOrder(num_order)
  if(order.state === 'Por Enviar' && order.num_order != 0){
    let state = 'Enviado'

    await ventasModel.UptadeState(state, num_order)
  }else{
    console.log('no cambiar')
  }

  let url = '/ventas/num_order/' + num_order

  res.redirect(url),{
    layout: 'ventas/layout'
  }

})


router.post('/editar', async (req, res, next) => {
  try {
    var obj = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      stock: req.body.stock,
      marca: req.body.marca,
      subcategory: req.body.subcategory,
      ison: 1
    }
    await porductoModel.modificarProductById(obj, req.body.id);
    var objcloud = {
      name: req.body.name,
      xs: req.body.XS,
      s: req.body.S,
      m: req.body.M,
      l: req.body.L,
      xl: req.body.XL,
      xxl: req.body.XXL,
      xxxl: req.body.XXXL
    }
    var objshoe = {
      name: req.body.name,
      three_half: req.body.three_half,
      four: req.body.four,
      four_half: req.body.four_half,
      five: req.body.five,
      five_half: req.body.five_half,
      six: req.body.six,
      six_half: req.body.six_half,
      seven: req.body.seven,
      seven_half: req.body.seven_half,
      eight: req.body.eight,
      eight_half: req.body.eight_half,
      nine: req.body.nine,
      nine_half: req.body.nine_half,
      ten: req.body.ten,
      ten_half: req.body.ten_half,
      eleven: req.body.eleven,
      eleven_half: req.body.eleven_half,
      twelve: req.body.twelve,
      twelve_half: req.body.twelve_half,
      thirteen: req.body.thirteen,
      thirteen_half: req.body.thirteen_half,
      fourteen: req.body.fourteen,
      fourteen_half: req.body.fourteen_half,
      fifteen: req.body.fifteen
    }
    if (req.body.name != req.body.nameAnterior) {
      if (req.body.category == req.body.CategoryAnterior) {
        if (req.body.category == 'shoe') {
          var objshoe = {
            name: req.body.name,
            three_half: req.body.three_half,
            four: req.body.four,
            four_half: req.body.four_half,
            five: req.body.five,
            five_half: req.body.five_half,
            six: req.body.six,
            six_half: req.body.six_half,
            seven: req.body.seven,
            seven_half: req.body.seven_half,
            eight: req.body.eight,
            eight_half: req.body.eight_half,
            nine: req.body.nine,
            nine_half: req.body.nine_half,
            ten: req.body.ten,
            ten_half: req.body.ten_half,
            eleven: req.body.eleven,
            eleven_half: req.body.eleven_half,
            twelve: req.body.twelve,
            twelve_half: req.body.twelve_half,
            thirteen: req.body.thirteen,
            thirteen_half: req.body.thirteen_half,
            fourteen: req.body.fourteen,
            fourteen_half: req.body.fourteen_half,
            fifteen: req.body.fifteen
          }
          await porductoModel.modificarShoeSizeById(objshoe, req.body.nameAnterior)
        }
        if (req.body.category == 'clothing') {

          await porductoModel.modificarClothingSizeById(objcloud, req.body.nameAnterior)

        }

      } else {
        if (req.body.category == 'shoe' && req.body.CategoryAnterior == 'clothing') {
          var objshoe = {
            name: req.body.name,
            three_half: req.body.three_half,
            four: req.body.four,
            four_half: req.body.four_half,
            five: req.body.five,
            five_half: req.body.five_half,
            six: req.body.six,
            six_half: req.body.six_half,
            seven: req.body.seven,
            seven_half: req.body.seven_half,
            eight: req.body.eight,
            eight_half: req.body.eight_half,
            nine: req.body.nine,
            nine_half: req.body.nine_half,
            ten: req.body.ten,
            ten_half: req.body.ten_half,
            eleven: req.body.eleven,
            eleven_half: req.body.eleven_half,
            twelve: req.body.twelve,
            twelve_half: req.body.twelve_half,
            thirteen: req.body.thirteen,
            thirteen_half: req.body.thirteen_half,
            fourteen: req.body.fourteen,
            fourteen_half: req.body.fourteen_half,
            fifteen: req.body.fifteen
          }
          await porductoModel.deleteClothingSizeById(req.body.nameAnterior)
          await porductoModel.CreateShoeSize(objshoe)
        }
        if (req.body.category == 'clothing' && req.body.CategoryAnterior == 'shoe') {
          var objcloud = {
            name: req.body.name,
            xs: req.body.XS,
            s: req.body.S,
            m: req.body.M,
            l: req.body.L,
            xl: req.body.XL,
            xxl: req.body.XXL,
            xxxl: req.body.XXXL
          }
          await porductoModel.deleteShoeSizeById(req.body.nameAnterior)
          await porductoModel.CreateClothingSize(objcloud)
        }
        if (req.body.category == 'accessories' && req.body.CategoryAnterior == 'shoe') {
          await porductoModel.deleteShoeSizeById(req.body.nameAnterior)
        }
        if (req.body.category == 'accessories' && req.body.CategoryAnterior == 'clothing') {
          await porductoModel.deleteClothingSizeById(req.body.nameAnterior)
        }
        if (req.body.category == 'clothing' && req.body.CategoryAnterior == 'accessories') {
          await porductoModel.CreateClothingSize(objcloud)
        }
        if (req.body.category == 'shoe' && req.body.CategoryAnterior == 'accessories') {
          await porductoModel.CreateShoeSize(objshoe)
        }
      }
    } else if (req.body.category != req.body.CategoryAnterior) {
      if (req.body.category == 'shoe' && req.body.CategoryAnterior == 'clothing') {
        var objshoe = {
          name: req.body.name,
          three_half: req.body.three_half,
          four: req.body.four,
          four_half: req.body.four_half,
          five: req.body.five,
          five_half: req.body.five_half,
          six: req.body.six,
          six_half: req.body.six_half,
          seven: req.body.seven,
          seven_half: req.body.seven_half,
          eight: req.body.eight,
          eight_half: req.body.eight_half,
          nine: req.body.nine,
          nine_half: req.body.nine_half,
          ten: req.body.ten,
          ten_half: req.body.ten_half,
          eleven: req.body.eleven,
          eleven_half: req.body.eleven_half,
          twelve: req.body.twelve,
          twelve_half: req.body.twelve_half,
          thirteen: req.body.thirteen,
          thirteen_half: req.body.thirteen_half,
          fourteen: req.body.fourteen,
          fourteen_half: req.body.fourteen_half,
          fifteen: req.body.fifteen
        }
        await porductoModel.deleteClothingSizeById(req.body.nameAnterior)
        await porductoModel.CreateShoeSize(objshoe)
      }
      if (req.body.category == 'clothing' && req.body.CategoryAnterior == 'shoe') {
        var objcloud = {
          name: req.body.name,
          xs: req.body.XS,
          s: req.body.S,
          m: req.body.M,
          l: req.body.L,
          xl: req.body.XL,
          xxl: req.body.XXL,
          xxxl: req.body.XXXL
        }
        await porductoModel.deleteShoeSizeById(req.body.nameAnterior)
        await porductoModel.CreateClothingSize(objcloud)
      }
      if (req.body.category == 'accessories' && req.body.CategoryAnterior == 'shoe') {
        await porductoModel.deleteShoeSizeById(req.body.nameAnterior)
      }
      if (req.body.category == 'accessories' && req.body.CategoryAnterior == 'clothing') {
        await porductoModel.deleteClothingSizeById(req.body.nameAnterior)
      }
      if (req.body.category == 'clothing' && req.body.CategoryAnterior == 'accessories') {
        await porductoModel.CreateClothingSize(objcloud)
      }
      if (req.body.category == 'shoe' && req.body.CategoryAnterior == 'accessories') {
        await porductoModel.CreateShoeSize(objshoe)
      }
    }

    if (req.body.category == req.body.CategoryAnterior) {
      if (req.body.category == 'shoe') {

        porductoModel.modificarShoeSizeById(objshoe, req.body.nameAnterior)
      }
      if (req.body.category == 'clothing') {

        porductoModel.modificarClothingSizeById(objcloud, req.body.nameAnterior)
      }
    }

    res.redirect('/inicio')
  }
  catch (error) {
    console.log(error)
    res.redirect('/inicio/editar/{req.body.id}'), {
      layout: 'admin/layout',
      error: true,
      message: 'No se modifico el NFT vuelva a interntarlo'
    }
  }
})

module.exports = router;
