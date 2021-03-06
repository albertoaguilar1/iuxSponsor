  
'use strict'
// Cargamos el módulo de express para poder crear rutas
var express = require('express');
// Llamamos al router
var router = express.Router();
// Cargamos el controlador
var sponsorsController = require('../controllers/sponsorsController');
//cargamos la utilidad para verificar token
var authenticated = require('../middlewares/authenticated');

router.get('/',function(req,res){
    res.json({
        status:'API Sponsor WORKING',
        message:'Bienvenido a la raiz del servicio'
    });
});


    // Contact routes
router.route('/sponsors')
.get(authenticated,sponsorsController.index)
.post(authenticated,sponsorsController.new);

router.route('/sponsors/:sponsors_id')
.get(authenticated,sponsorsController.view)
.patch(authenticated,sponsorsController.update)
.put(authenticated,sponsorsController.update)
.delete(authenticated,sponsorsController.delete);


router.route('/sponsors/email/:EmailSponsor')
.get(sponsorsController.viewEmail)


// Exportamos la configuración
module.exports=router ;