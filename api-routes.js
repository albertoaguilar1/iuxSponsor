//inicializa express router
let router = require('express').Router();

//set deafuilt API RESPONSE 

//Import sponsorsController
var sponsorsController = require('./sponsorsController');
  

    // Contact routes
router.route('/sponsors')
.get(sponsorsController.index)
.post(sponsorsController.new);

router.route('/sponsors/:sponsors_id')
.get(sponsorsController.view)
.patch(sponsorsController.update)
.put(sponsorsController.update)
.delete(sponsorsController.delete);



router.get('/',function(req,res){
    res.json({
        status:'API ITS working',
        message:'Welcome to restHub crafted with lovesssss!'
    });
});





//export api routers
module.exports=router ;