//Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Member = require('./models/members');
const moment = require('moment');
const methodOverride = require('method-override');
const MemberDemo = require('./models/demoM');
const BugsDemo = require('./models/demoB')


const Bugs = require('./models/bugs');
const User = require('./models/user');
const session = require('express-session');

const indexController = require('./Controllers/index');
const usersController = require('./Controllers/users');
const PORT = process.env.PORT || "3000"
//Initialize app
const app = express();
app.use(express.static('public'))


//configure settings 
require('dotenv').config();



const {
	DATABASE_URL,
	
	SECRET
} = process.env;

//Connect to and configure mongoDB with mongoose
mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

//Set up mongodb event listeners
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('disconnected', (err) => console.log('MongoDB Error: ' + err.message))

//Mount Middleware

app.use((req, res, next) => {
	res.locals.moment = moment;
	next()
});

app.use(async function(req, res, next) {
    if(req.session && req.session.user) {
        const user = await require('./models/user').findById(req.session.user)
        res.locals.user = user;
    } else {
        res.locals.user = null;
    }
    next();
});







app.use(express.static('public'))
app.use(methodOverride('_method'))


app.use(morgan('dev'));
app.use(express.urlencoded({
	extended: false
}));
app.use(session({
	secret: SECRET,
	resave: false,
	saveUninitialized: true
}))

//Mount Routes
app.use('/', indexController);
app.use('/', usersController);


/* -----------Members Routes--------------- */
app.get('/members', (req, res) => {
	Member.find({}, (err, members) => {
	User.find({},(err,users) => {
		res.render(__dirname + '/views/Member/index.ejs', {members,users})
	


})

})
})




app.post('/members', (req, res) => {

	Member.create(req.body, (err, members) => {
	 
	
		res.redirect('/members')

	
	})
	
})





app.get('/members/:id/edit', (req, res) => {
	Member.findById(req.params.id, (err, members) => {
		res.render(__dirname + '/views/Member/edit.ejs', {
			members
		})
	})
})

app.get('/members/:id/editUser', (req, res) => {
	User.findById(req.params.id, (err, users) => {
		console.log(err)
		res.render(__dirname + '/views/Member/editUser.ejs', {
			users
		})
	})
})


	


app.put('/members/:id', (req, res) => {
	req.body.completed = !!req.body.completed;
	Member.findByIdAndUpdate(
	User.findByIdAndUpdate(
	
		req.params.id,
		req.body, {
			new: true
		},
		(err, members,users) => {
			console.log(err)
			res.redirect('/members')
		}))})
	
	




app.delete('/members/:id', (req, res) => {
	Member.findByIdAndRemove(req.params.id, (err, deleteMember) => {
		User.findByIdAndRemove(req.params.id, (err, deleteUser) => {
		res.redirect('/members')
	})
})

})




/* -----------Dashboard Routes--------------- */



app.get('/dashboard', (req, res) => {
	Bugs.find({}, (err, bugs) => {
		res.render(__dirname + '/views/dashboard/index.ejs', {
			bugs
		})
	})
	Members.find({}, (err, members) => {
		res.render(__dirname + '/views/dashboard/index.ejs', {
			members
		})
	})

	User.find({}, (err, users) => {
		res.render(__dirname + '/views/dashboard/index.ejs', {
			users
		})
	})

})

app.post('/dashboard', (req, res) => {
	Bugs.create(req.body, (err, bugs) => {
		res.redirect('/dashboard')
	})
})

app.get('/dashboard/:index', (request, response) => {
	const foundbugs = bugs.find(function(bugs) {
		return bugs.id === Number(request.params.index)

	});
	response.render('show.ejs', {
		Bugs: bugs[request.params.index]
	});
});

app.get('/dashboard/:id', (request, response) => {
	Member.findById(request.params.id, (err, members) => {
		res.render(__dirname + '/views/dashboard/index.ejs', {
			members
		})
	})
})


/* -----------Bugs Routes--------------- */

app.get('/project/:id', (request, response) => {
	Bugs.findById(request.params.id, (err, bugs) => {
		console.log(err)
		res.render(__dirname + '/views/project/index.ejs', {
			bugs
		})
	})
})

app.get('/project', (req, res) => {
	Bugs.find({}, (err, bugs) => {
	Member.find({},(err,members) => {
		res.render(__dirname + '/views/project/index.ejs', {
			bugs,members
		})
	})
	
	
})

})






app.post('/project', (req, res) => {

	Bugs.create(req.body, (err, bugs) => {
		res.redirect('/project')

	})
})

app.get('/project/:id/edit', (req, res) => {
	Bugs.findById(req.params.id, (err, bugs) => {
		res.render(__dirname + '/views/project/edit.ejs', {
			bugs
		})
	})
})

app.put('/project/:id', (req, res) => {
	req.body.completed = !!req.body.completed;
	Bugs.findByIdAndUpdate(
		req.params.id,
		req.body, {
			new: true
		},
		(err, bugs) => {
			console.log(err)
			res.redirect('/project')
		})
})

app.put('/members/:id', (req, res) => {
	req.body.completed = !!req.body.completed;
	Member.findByIdAndUpdate(
		req.params.id,
		req.body, {
			new: true
		},
		(err, members) => {
			console.log(err)
			res.redirect('/members')
		})
})

app.delete('/members/:id', (req, res) => {
	Member.findByIdAndRemove(req.params.id, (err, deleteMember) => {
		res.redirect('/members')
	})
})

app.delete('/project/:id', (req, res) => {
	Bugs.findByIdAndRemove(req.params.id, (err, deleteBugs) => {
		res.redirect('/project')
	})
})


/* -------------Logout Route ------------- */
app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


/* ----------------------Demo ----------------------- */
				/*Members*/

app.get('/demo/members/', (req, res) => {
	MemberDemo.find({}, (err, memberdemo) => {
		res.render(__dirname + '/views/Demo/Members/index.ejs', {memberdemo})
		})
		})
				


app.post('/demo/members/', (req, res) => {

	MemberDemo.create(req.body, (err, memberdemo) => {
	 
	
		res.redirect('/demo/members/')

	
	})
	
})


app.get('/demo/members/:id/edit', (req, res) => {
	MemberDemo.findById(req.params.id, (err, memberdemo) => {
		res.render(__dirname + '/views/Demo/Members/edit.ejs', {
			memberdemo
		})
	})
})




app.put('/demo/members/:id', (req, res) => {
	req.body.completed = !!req.body.completed;
	MemberDemo.findByIdAndUpdate(
		req.params.id,
		req.body, {
			new: true
		},
		(err, memberdemo) => {
			console.log(err)
			res.redirect('/demo/members/')
		})})
	
	

app.delete('/demo/members/:id', (req, res) => {
	MemberDemo.findByIdAndRemove(req.params.id, (err, deleteMemberDemo) => {
				res.redirect('/demo/members/')
			})
		})



		app.get('/demo/project/:id', (request, response) => {
			BugsDemo.findById(request.params.id, (err, bugsdemo) => {
				console.log(err)
				res.render(__dirname + '/views/Demo/Projects/index.ejs', {
					bugsdemo
				})
			})
		})
		
		app.get('/demo/project', (req, res) => {
			BugsDemo.find({}, (err, bugsdemo) => {
				res.render(__dirname + '/views/Demo/Projects/index.ejs', {
					bugsdemo
				})

			
			
		})
		
		})
		
		
		
		
		
		
		app.post('/demo/project', (req, res) => {
		
			BugsDemo.create(req.body, (err, bugsdemo) => {
				res.redirect('/demo/project')
		
			})
		})
		
		app.get('/demo/project/:id/edit', (req, res) => {
			BugsDemo.findById(req.params.id, (err, bugsdemo) => {
				res.render(__dirname + '/views/Demo/Projects/edit.ejs', {
					bugsdemo
				})
			})
		})
		
		app.put('/demo/project/:id', (req, res) => {
			req.body.completed = !!req.body.completed;
			BugsDemo.findByIdAndUpdate(
				req.params.id,
				req.body, {
					new: true
				},
				(err, bugsdemo) => {
					console.log(err)
					res.redirect('/demo/project')
				})
		})
		

app.delete('/demo/project/:id', (req, res) => {
	BugsDemo.findByIdAndRemove(req.params.id, (err, deleteBugsdemo) => {
		res.redirect('/demo/project')
	})
})














app.get('/demo/dashboard', (req, res) => {
	BugsDemo.find({}, (err, bugsdemos) => {
		MemberDemo.find({}, (err, memberdemos) => {
		res.render(__dirname + '/views/Demo/Dashboard/index.ejs', {
			bugsdemos,memberdemos
		})
	})
	
	
	})



})



app.post('/demo/dashboard', (req, res) => {
	BugsDemo.create(req.body, (err, bugsdemos) => {
		res.redirect('/demo/dashboard')
	})
})

app.get('/demo/dashboard/:index', (request, response) => {
	const foundbugsdemo = bugsdemo.find(function(bugsdemos) {
		return bugsdemos.id === Number(request.params.index)

	});
	response.render('show.ejs', {
		BugsDemo: bugsdemo[request.params.index]
	});
});

app.get('/demo/dashboard/:id', (request, response) => {
	MemberDemo.findById(request.params.id, (err, memberdemos) => {
		res.render(__dirname + '/views/Demo/Dashboard/index.ejs', {
			memberdemos
		})
	})
})





app.listen(PORT, () => {
	console.log('Express is Listening on port ' + PORT)
})