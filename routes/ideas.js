const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

//load Idea model
require('../models/Idea');
//load the model into a variable
const Idea = mongoose.model('ideas');

//Idea index page
router.get('/', (req, res) => {
  //get all(no query) ideas from database in sorting order
  Idea.find({})
    .sort({ date: 'desc' })
    //get result and pass to the template
    .then(ideas => {
      res.render('ideas/index', {
        ideas: ideas
      });
    });
});

//Add Idea form
router.get('/add', (req, res) => {
  res.render('ideas/add');
});

//Edit Idea form, represent a param with a placeholder :id
router.get('/edit/:id', (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render('ideas/edit', { idea: idea });
    });

});

//process Add Idea form
router.post('/', (req, res) => {
  //get user input using body-parser

  //validation
  let errors = [];

  if (!req.body.title) {
    //push onto the arrays an object with text 'add title'
    errors.push({
      text: 'Please add a title'
    })
  }

  if (!req.body.details) {
    //push onto the arrays an object with text 'add title'
    errors.push({
      text: 'Please add some details'
    })
  }

  if (errors.length > 0) {
    res.render('/ideas/add', {
      errors: errors,
      title: req.body.title,
      details: req.body.details
    });
  } else {
    //create obj of new user
    const newUser = {
      title: req.body.title,
      details: req.body.details
    }
    //create a new idea obj from idea model created
    new Idea(newUser)
      .save()
      //return idea
      .then( idea => {
        req.flash('success_msd', 'Video Idea added!');
        res.redirect('/ideas');
      })
  }
});


//Edit form process
router.put('/:id', (req, res) => {
   Idea.findOne({
     _id: req.params.id
   })
   .then(idea => {
     //new values
     idea.title = req.body.title;
     idea.details = req.body.details;

     idea.save()
     .then(idea => {
       req.flash('success_msg', 'Video Idea Updated!');
       res.redirect('/ideas');
     })
   });
});

//Delete Idea
router.delete('/:id', (req, res)=>{
  req.flash('success_msg', 'Video Idea removed!');
  res.send('Delete');
});



//export the router
module.exports = router;