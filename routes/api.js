const Auth = require('../controllers/auth');
const Complaint = require('../controllers/complaint');
const user = require('../middleware/user');
const Leave = require('../controllers/leave');

const api = (app) => {
    app.post('/api/register', Auth.register);
    app.post('/api/login', Auth.login);
    app.get('/api/verify/:token', Auth.verify);

    app.get('/api/user', user, Auth.getUsers);
    app.get('/api/user/:id', user, Auth.getUser);
    app.put('/api/user', user, Auth.updateUser);

    app.post('/api/complaint', user, Complaint.create);
    app.get('/api/complaint', user, Complaint.getAll);
    app.get('/api/complaint/:id', user, Complaint.getOne);
    app.get('/api/complaint/type/:type', user, Complaint.getByType);
    app.put('/api/complaint/:id', Complaint.update);

    app.get('/api/leave/:id', user, Leave.getAllLeaves);
    app.post('/api/leave', user, Leave.createLeave);
}

module.exports = api;