const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const IdeaSchema = new Schema({
title: {
  type: String,
  required: true
},
details: {
  type: String,
  required: true
},
date: {
  type: Date,
  default: Date.now
}
});

//create a model and connect to idea schema
mongoose.model('ideas', IdeaSchema);