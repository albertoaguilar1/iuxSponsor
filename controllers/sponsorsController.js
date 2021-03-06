'use strict'
// Cargamos los modelos para usarlos posteriormente
var Sponsors = require('../models/sponsorsModel');


// Handle index actions
exports.index = function (req, res) {
    console.log("index")
    Sponsors.get(function (err, sponsors) {
        if (err) {
          
            return res.status(404).send({
                status: "error",
                message: err,
            });
        }

           return res.status(200).send({
            
            status: "success",
            message: "sponsors retrieved successfully",
            data: sponsors
        });
      
    });
};

// Handle view  info
exports.viewEmail= (req, res) => {
    console.log("viewEmail"); 
  // Validate request
  if(!req.params.EmailSponsor) {
    return res.status(400).send({
        message: "Sponsor EmailSponsor can not be empty"
    });
}
       
        Sponsors.findOne({EmailSponsor:req.params.EmailSponsor})
    .then(sponsors => {
        if(!sponsors) {
            return res.status(404).send({
                message: "Sponsor not found with email " + req.params.EmailSponsor,
                status:'400',
                data: err
            });            
        }
        return res.status(200).send({
            status: "success",
            message: "Sponsor found",
            data: sponsors
        });
   
    }).catch(err => {
        console.log(err)
        if(err.kind === 'EmailSponsor') {
            return res.status(404).send({
                message: "Sponsor not found with email " + req.params.EmailSponsor,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Sponsor with email " + req.params.EmailSponsor,
            status:'500',
            data: err
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
    sponsors.DateBeginSponsor = req.body.DateBeginSponsor ? req.body.DateBeginSponsor : new Date();
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

       
        res.status(400).send({
            message: err.message || "Some error occurred while creating the sponsors.",
            status:'400',
            data: err
           
        });
    });
};


// Update a sponsor identified by the sponsors_id in the request
exports.update = (req, res) => {
    console.log("update  " +   req.params.sponsors_id); 

      // Validate Request
      if(!req.body) {
        console.log("update " +  req.body); 
        return res.status(400).send({
            message: "Sponsor body can not be empty"
        });
    }

    // Find note and update it with the request body
    Sponsors.findByIdAndUpdate(req.params.sponsors_id, {
        NameSponsor : req.body.NameSponsor ? req.body.NameSponsor : sponsors.NameSponsor,
        DescriptSponsor : req.body.DescriptSponsor,
        EmailSponsor : req.body.EmailSponsor,
        ImgSponsor : req.body.ImgSponsor,
        StatusSponsor : req.body.StatusSponsor,
        DateEndSponsor : req.body.DateEndSponsor

    }, {new: true})
    .then(sponsors => {
        if(!sponsors) {
            return res.status(404).send({
                message: "Sponsors not found with id " + req.params.sponsors_id,
                    status:'404',
                    data: err
            });
        }
        return res.status(200).send({
            message: 'sponsor Info updated',
            status:"success",
            data: sponsors
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
    console.log("delete  " +  req.params.sponsors_id); 
    if(!req.params.sponsors_id) {
        return res.status(400).send({
            message: "Sponsors content can not be empty"
        });
    }

    Sponsors.findByIdAndRemove(req.params.sponsors_id)
    .then(sponsors => {
        if(!sponsors) {
            return res.status(404).send({
                message: "Sponsors not found with id " + req.params.sponsors_id,
                status:'404',
                data: err
            });
        }
        res.send({  
            message: "Sponsors deleted successfully!",
            status:"success",
            data: sponsors
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Sponsors not found with id " + req.params.sponsors_id,
                status:'404',
                data: err
            });                
        }
        return res.status(500).send({
            message: "Could not delete Sponsor with id " + req.params.sponsors_id,
            status:'500',
            data: err
        });
    });
};


