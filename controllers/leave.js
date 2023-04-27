const Leave = require('../models/leave');

const createLeave = async (req, res) => {
    try {
        const { type, visitingPlace, reason, fromDate, fromTime, toDate, toTime, userid, username } = req.body;
        const newLeave = new Leave({
            type: type,
            visitingPlace: visitingPlace,
            reason: reason,
            fromDate: fromDate,
            fromTime: fromTime,
            toDate: toDate,
            toTime: toTime,
            userid: userid,
        });
        await newLeave.save();

        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        const fromDateLocal = new Date(fromDate).toLocaleDateString();
        const toDateLocal = new Date(toDate).toLocaleDateString();
        client.messages
            .create({
                body: `Leave Request from ${username} from ${fromDateLocal} ${fromTime} to ${toDateLocal} ${toTime} for ${visitingPlace} for ${reason}`,
                messagingServiceSid: process.env.TWILIO_APP_SID,
                to: '+919432705210'
            });

        res.status(201).json({
            message: 'Leave created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAllLeaves = async (req, res) => {
    try {
        const userid = req.params.id;
        const leaves = await Leave.find({ userid: userid }).sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createLeave,
    getAllLeaves,
};