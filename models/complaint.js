const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    userid : {
        type : String,
        required : true,
    },
});

module.exports = mongoose.model('Complaint', complaintSchema);