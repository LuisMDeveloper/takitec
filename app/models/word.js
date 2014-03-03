/**
 * Created by icarus on 2/17/14.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var WordSchema = new Schema({
    word: String,
    image: String
});

mongoose.model('Word', WordSchema);