const express = require('express');
const Member = require('../models/members');
const membersRouter = express.Router();


membersRouter.get('/members', (req,res) => {
  Member.find({},(err,members) => {
    console.log(err)
  res.render( 'Member/index.ejs',{members})
  

  })
})

membersRouter.post('/members', (req,res) => {

  Member.create(req.body, (err, members) => {
      res.redirect('/members')

  })
})



membersRouter.get('/members/:id/edit', (req,res) => {
  Member.findById(req.params.id,(err,members) => {
      res.render(__dirname + '/views/Member/edit.ejs',{members})
  })
})



membersRouter.put('/members/:id',(req,res) => {
  req.body.completed = !!req.body.completed;
  Member.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    {new: true},
    (err,members) => {
        console.log(err)
    res.redirect('/members')
  })
})

membersRouter.delete('/members/:id', (req,res) => {
  Member.findByIdAndRemove(req.params.id,(err,deleteMember) => {
    res.redirect('/members')
  })})


  

  membersRouter.put('/members/:id',(req,res) => {
    req.body.completed = !!req.body.completed;
    Member.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {new: true},
      (err,members) => {
          console.log(err)
      res.redirect('/members')
    })
  })

  membersRouter.delete('/members/:id', (req,res) => {
    Member.findByIdAndRemove(req.params.id,(err,deleteMember) => {
        console.log(err)
      res.redirect('/members')
    })})

  
    module.exports = membersRouter;