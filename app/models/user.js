/**
 * Created by Luis Manuel Ramirez Vargas <luis.manuel.ramirez.91@gmail.com> on 2/24/14.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String
});

mongoose.model('User', UserSchema);