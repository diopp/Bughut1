//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const ProjectSchema = new Schema ({
    name: {type: String, required: true},
    owner:{type: String, require: true},
    status:{type: String, required: true},
    bugs:{type: String, required: true},
    date:{type: Date, required: true}
    
})

module.exports = mongoose.model('Project', MemberSchema);