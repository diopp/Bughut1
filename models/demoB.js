//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define the schema
const DemobugSchema = new Schema({
     demoname:  {type: String, required: true}, 
     demoproject: {type: Array, required: true },
     demoassigned:  {type: String, required: true},
     demostatus: {type: String, required: false},
     demoseverity: {type: String, required: false},   
     demoauthor: {type: String, required: true},
     demodescription: {type: String, required: true, },
     demodate: {type: Date, required: true,},
     
     
})


module.exports = mongoose.model('BugsDemo',DemobugSchema);