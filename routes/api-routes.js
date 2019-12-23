  
'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Llamamos al router
var router = express.Router();
// Cargamos el controlador
var sponsorsController = require('../controllers/sponsorsController');


router.get('/',function(req,res){
    res.json({
        status:'API Sponsor WORKING',
        message:'Bienvenido a la raiz del servicio'
    });
});


    // Contact routes
router.route('/sponsors')
.get(sponsorsController.index)
.post(sponsorsController.new);

router.route('/sponsors/:sponsors_id')
.get(sponsorsController.view)
.patch(sponsorsController.update)
.put(sponsorsController.update)
.delete(sponsorsController.delete);


router.route('/sponsors/email/:EmailSponsor')
.get(sponsorsController.viewEmail)


// Exportamos la configuración
module.exports=router ;