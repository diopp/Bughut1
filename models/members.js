//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const MemberSchema = new Schema ({
    name: {type: String, required: true},
    email:{type: String, require: true},
    phone:{type: Number, required: true},
})

module.exports = mongoose.model('Member', MemberSchema);