const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const diarySchema = new Schema({

    date:{type:date,required:true},
    img:{type:String},
    title:{type:String,required:true},
    content:{type:String,required:true},
    CreatedAt: {
        type: Schema.Types.date,
        ref: 'User',
    },
    updatedAt: {
        type: Schema.Types.date,
        ref: 'User',
    }
});

module.exports= mongoose.model('diary',diarySchema);