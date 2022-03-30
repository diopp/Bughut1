const usersRouter = require('express').Router();
const User = require('../models/user');
const Bugs = require('../models/bugs');
const Member = require('../models/members');

const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
//Router
usersRouter.get('/login', (req, res) => {
	res.render('login.ejs');
});

usersRouter.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, '+password', (err, foundUser) => {
        if(!foundUser) return res.render('login.ejs', {err: 'invalid creds'});
        if(!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.render('login.ejs', {err: 'invalid creds'});
        }
        req.session.user = foundUser._id
        res.redirect('/dashboard');
    })
});



usersRouter.get('/signup', (req, res) => {
	res.render('signup.ejs');
});





usersRouter.post('/signup', (req, res) => {
	const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(SALT_ROUNDS))
	req.body.password = hash;
	User.create(req.body, (error, users) => {
		req.session.user = users._id;
		res.redirect('/login');
	})

});

usersRouter.get('/logout', (req, res) => {
	req.session.destroy(() => {
		res.redirect('/')

	})
})

usersRouter.get('/dashboard', (req, res) => {
	if (!req.session.user) return res.redirect('/login');
	Bugs.find({}, (err, bugs) => {
		Member.find({}, (err, members) => {
			User.find({}, (err, users) => {
	

				res.render('dashboard/index.ejs', {users,bugs,members})
})
		})
	})
})

module.exports = usersRouter;