//Dependencies
const indexRouter = require('express').Router()

//Define controller
indexRouter.get('/', (req,res) => {
    //console.log(req.session)

    res.render('home.ejs')
})


//Export the router
module.exports = indexRouter;