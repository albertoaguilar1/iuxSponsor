// sponsorsController.js
// Import user model
var Sponsors = require('./model/sponsorsModel');



// Handle index actions
exports.index = function (req, res) {
    Sponsors.get(function (err, sponsors) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Sponsors retrieved successfully",
            data: sponsors
        });
    });
};





// Handle view sponsors info
exports.view = function (req, res) {
    Sponsors.findById(req.params.sponsors_id, function (err, sponsors) {
        console.log("req.params.sponsors_id, IS: " + req.params.sponsors_id);
        if (err)
            res.send(err);
           
            res.json({
            message: 'sponsors details loading..',
           
            data: sponsors
        });
    });
};


// Handle create user actions
exports.new = function (req, res) {
    var sponsors = new Sponsors();
    sponsors.NameSponsor = req.body.NameSponsor ? req.body.NameSponsor : sponsors.NameSponsor;
    sponsors.DescriptSponsor = req.body.DescriptSponsor;
    sponsors.EmailSponsor = req.body.EmailSponsor;
    sponsors.ImgSponsor = req.body.ImgSponsor;
    sponsors.StatusSponsor = req.body.StatusSponsor;
    sponsors.DateBeginSponsor = req.body.DateBeginSponsor;
    sponsors.DateEndSponsor = req.body.DateEndSponsor;



    console.log("REQ.BODY.lastname IS: " + req.body.NameSponsor);
    console.log("REQ.BODY.lastname IS: " + req.body.DescriptSponsor);
  
// save the user and check for errors
sponsors.save(function (err) {
         if (err)
             res.json(err);
res.json({
            message: 'New user created!',
            data: sponsors
        });
    });
};




// Handle update user info
exports.update = function (req, res) {
    Sponsors.findById(req.params.sponsors_id, function (err, sponsors) {
        console.log("req.params.sponsors_id IS: " +   req.params.sponsors_id); 

        if (err)
            res.send(err);
            sponsors.NameSponsor = req.body.NameSponsor ? req.body.NameSponsor : sponsors.NameSponsor;
            sponsors.DescriptSponsor = req.body.DescriptSponsor;
            sponsors.EmailSponsor = req.body.EmailSponsor;
            sponsors.ImgSponsor = req.body.ImgSponsor;
            sponsors.StatusSponsor = req.body.StatusSponsor;
            sponsors.DateBeginSponsor = req.body.DateBeginSponsor;
            sponsors.DateEndSponsor = req.body.DateEndSponsor;
         
           
// save the sponsor and check for errors
            sponsors.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'sponsor Info updated',
                data: sponsors
            });
        });
    });
};
// Handle delete user
exports.delete = function (req, res) {
    Sponsors.remove({
   
    }, 
    

    function (err, sponsors) {
        console.log("req.params.sponsors_id IS: " + req.params.sponsors_id); 
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'sponsor deleted'
        });
    });
};


