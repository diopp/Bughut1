//Dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema

const MemberdemoSchema = new Schema ({
    demoname: {type: String, required: true},
    demoemail:{type: String, require: true},
    demophone:{type: Number, required: true},
})

module.exports = mongoose.model('MemberDemo', MemberdemoSchema);