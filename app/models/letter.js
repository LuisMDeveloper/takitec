/**
 * Created by icarus on 1/31/14.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LetterSchema = new Schema({
    letter: String,
    image: String
});

mongoose.model('Letter', LetterSchema);
