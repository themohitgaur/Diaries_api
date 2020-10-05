const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const diarySchema = new Schema({

    date:{type:date,required:true},
    img:{type:String},
    title:{type:String,required:true},
    content:{type:String,required:true},
});

module.exports= mongoose.model('diary',diarySchema);