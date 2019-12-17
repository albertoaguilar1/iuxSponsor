'use strict'
// Cargamos los modelos para usarlos posteriormente
var Sponsors = require('../models/sponsorsModel');



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
    console.log("view");

    if(!req.params.sponsors_id) {
        return res.status(400).send({
            message: "Sponsor sponsors_id can not be empty"
        });
    }

    Sponsors.findById(req.params.sponsors_id)
    .then(sponsors => {
        if(!sponsors) {
            return res.status(404).send({
                message: "Sponsors not found with id " + req.params.sponsors_id,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "sponsors found",
            data: sponsors
        });
   
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "sponsor not found with id " + req.params.sponsors_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Sponsor with id " + req.params.sponsors_id,
            status:'500',
            data: err
        });
    });
};



// Create and Save a new Sponsor
exports.new= (req, res) => {
    console.log("new  " ); 
  // Validate request
  if(!req.body) {
    return res.status(400).send({
        message: "Sponsor body can not be empty"
    });
}

    var sponsors = new Sponsors();
    sponsors.NameSponsor = req.body.NameSponsor ? req.body.NameSponsor : sponsors.NameSponsor;
    sponsors.DescriptSponsor = req.body.DescriptSponsor;
    sponsors.EmailSponsor = req.body.EmailSponsor;
    sponsors.ImgSponsor = req.body.ImgSponsor;
    sponsors.StatusSponsor = req.body.StatusSponsor;
    sponsors.DateBeginSponsor = req.body.DateBeginSponsor;
    sponsors.DateEndSponsor = req.body.DateEndSponsor;



    // Save sponsors in the database
    sponsors.save()
    .then(sponsors => {
        return res.status(200).send({
            message: 'New sponsors created!',
            status:"success",
            data: sponsors
        });
    }).catch(err => {

       
        res.status(500).send({
            message: err.message || "Some error occurred while creating the sponsors.",
            status:'500',
            data: err
           
        });
    });
};


// Update a sponsor identified by the sponsors_id in the request
exports.update = (req, res) => {

    console.log("update  " +   req.params.sponsors_id); 
    // Validate Request
    if(!req.params.sponsors_id) {
        return res.status(400).send({
            message: "Sponsor id can not be empty"
        });
    }


      // Validate Request
      if(!req.body) {
        console.log("update  " +  req.body); 
        return res.status(400).send({
            message: "Sponsor body can not be empty"
        });
    }

    // Find note and update it with the request body
    Sponsor.findByIdAndUpdate(req.params.sponsors_id, {
        NameSponsor : req.body.NameSponsor ? req.body.NameSponsor : sponsors.NameSponsor,
        DescriptSponsor : req.body.DescriptSponsor,
        EmailSponsor : req.body.EmailSponsor,
        ImgSponsor : req.body.ImgSponsor,
        StatusSponsor : req.body.StatusSponsor,
        DateBeginSponsor: req.body.DateBeginSponsor,
        DateEndSponsor : req.body.DateEndSponsor

    }, {new: true})
    .then(sponsor => {
        if(!sponsor) {
            return res.status(404).send({
                message: "User not found with id " + req.params.sponsors_id,
                    status:'404',
                    data: err
            });
        }
        return res.status(200).send({
            message: 'sponsor Info updated',
            status:"success",
            data: sponsor
        });
      
           
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Sponsor not found with id " + req.params.sponsors_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error updating sponsor with id " + req.params.sponsors_id,
            status:'500',
            data: err
        });
    });
};


// Delete a Sponsor with the specified SponsorId in the request
exports.delete = (req, res) => {
    console.log("delete  " +    req.params.sponsors_id); 
    if(! req.params.sponsors_id) {
        return res.status(400).send({
            message: "Sponsor content can not be empty"
        });
    }

    Sponsor.findByIdAndRemove( req.params.sponsors_id)
    .then(sponsor => {
        if(!sponsor) {
            return res.status(404).send({
                message: "Sponsor not found with id " + req.params.sponsors_id,
                status:'404',
                data: err
            });
        }
        res.send({  
            message: "Sponsor deleted successfully!",
            status:"success",
            data: sponsor
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Sponsor not found with id " + req.params.sponsors_id ,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Could not delete sponsor with id " +  req.params.sponsors_id,
            status:'500',
            data: err
        });
    });
};


