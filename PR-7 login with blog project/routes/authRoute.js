const express = require('express');
const { loginPage, loginUser,  registerPage, registerUser, logout, viewblogpage , addblogPage , addblogRecord ,  viewblogData } = require('../controllers/AuthController');

const routes = express.Router();

const passport = require('passport');

routes.get('/', loginPage);
routes.post('/loginUser', passport.authenticate('local', { failureRedirect: '/' }), loginUser);
routes.get('/viewblog', passport.checkUser, viewblogpage);

routes.post('/insertRecord',  addblogRecord);
routes.get('/viewrecord', viewblogData);

routes.get('/addblog', addblogPage);

routes.get('/register', registerPage);

routes.post('/registerUser', registerUser);
routes.get('/logout', logout)

module.exports = routes;