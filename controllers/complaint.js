const Complaint = require('../models/complaint');

const create = async (req, res) => {
    try {
        const { type, desc, status, userid } = req.body;
        const newComplaint = new Complaint({
            type: type,
            description: desc,
            status: status,
            userid: userid,
        });
        await newComplaint.save();
        res.status(201).json({
            message: 'Complaint created successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getAll = async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getOne = async (req, res) => {
    try {
        const userid = req.params.id;
        const complaint = await Complaint.find({ userid: userid }).sort({ createdAt: -1 });
        const filteredComplaints = complaint.filter(complaint => complaint.status !== 'Withdrawn');
        res.status(200).json(filteredComplaints);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

getByType = async (req, res) => {
    try {
        const type = req.params.type;
        const complaint = await Complaint.find({ type: type }).sort({ createdAt: -1 });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const update = async (req, res) => {
    try {
        const complaint = await Complaint.findById(req.params.id);
        const status = req.body.status;
        if(complaint) {
            complaint.status = status;
            await complaint.save();
            res.status(200).json({
                message: 'Complaint updated successfully'
            });
        } else {
            res.status(404).json({
                message: 'Complaint not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    create,
    getAll,
    getOne,
    getByType,
    update
};