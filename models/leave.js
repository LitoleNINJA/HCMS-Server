const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    type : {
        type : String,
        required : true,
    },
    visitingPlace : {
        type : String,
        required : true,
    },
    reason : {
        type : String,
        required : true,
    },
    fromDate : {
        type : Date,
        required : true,
    },
    fromTime : {
        type : String,
        required : true,
    },
    toDate : {
        type : Date,
        required : true,
    },
    toTime : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        default : 'Pending',
    },
    createdAt : {
        type : Date,
        default : Date.now,
    },
    userid : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('Leave', leaveSchema);