const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: {
        type: String,
        require:true
    },
    content : {
        type : String,
        require: true
    },
    date:{
        type : Date,
        require: true,
        date : Date.now
    }

})

module.exports = mongoose.model('Notes',NoteSchema)