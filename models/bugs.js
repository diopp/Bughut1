//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the schema
const bugSchema = new Schema({
     name:  {type: String, required: true}, 
     project: {type: Array, required: true },
     assigned:  {type: String, required: true},
     status: {type: String, required: false},
     severity: {type: String, required: false},   
     author: {type: String, required: true},
     description: {type: String, required: true, },
     date: {type: Date, required: true,},
     
     
})


module.exports = mongoose.model('Bugs',bugSchema);