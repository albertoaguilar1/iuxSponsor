// usersModel.js
var mongoose = require('mongoose');
// Setup schema
var SponsorsSchema = mongoose.Schema({
  //  SPONSOR_id: mongoose.Schema.Types.ObjectId,
  NameSponsor: {
        type: String,
        required: true
    },
    DescriptSponsor: {
        type: String,
        required: true
    },
    EmailSponsor: {
        type: String,
        required: true
    },
    ImgSponsor: {
        type: String,
        required: true
    },

    StatusSponsor: {
        type: Boolean,
        required: true
    },
    DateBeginSponsor: {
        type: Date,
        default: Date.now
    }, 
    DateEndSponsor: {
        type: Date,
        default: Date.now
    }

});
// Export Sponsors model
var Sponsors = module.exports = mongoose.model('Sponsors', SponsorsSchema);
module.exports.get = function (callback, limit) {
    Sponsors.find(callback).limit(limit);
}


