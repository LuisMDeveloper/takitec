/**
 * Created by icarus on 2/16/14.
 */
var fs = require('fs'),
    mongoose = require('mongoose'),
    Word = mongoose.model('Word');

exports.index = function (req, res) {
    Word.find(function (err, words) {
        if (err) return console.error(err);
        res.render('admin/index', {
            words: words
        });
    });
};

exports.remove = function (req, res) {
    var wordId = req.param('id');
    //var word = Word.findOne({ _id: wordId }, function () {
    //    console.log(word);
    //});
    Word.find({ _id: wordId }).remove(function () {
        res.redirect("back");
    });
};

exports.post = function (req, res) {
    if (req.files.image) {
        var word = req.param('word').toLowerCase();
        var image = req.files.image;
        // TODO : change path to reusable
        var newPath ="/home/icarus/development/repository/takitec/public/images/" + image.name;

        fs.readFile(image.path, function (err, data) {
            fs.writeFile(newPath, data, function (err) {
                res.redirect("back");
            });
        });

        var word = new Word({
            word: word,
            image: "images/" + image.name
        });
        word.save();
    }
};