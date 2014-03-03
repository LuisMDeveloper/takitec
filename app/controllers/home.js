var mongoose = require('mongoose')
    , User = mongoose.model('User')
    , Letter = mongoose.model('Letter')
    , Word = mongoose.model('Word');

exports.index = function (req, res) {
    //var letter = new Letter({
    //    letter: "a",
    //    image: "http://placehold.it/200&text=A"
    //});
    //letter.save();
    res.render('home/index', {
        title: 'TakiTec'
    });
};

exports.createUsers = function (req, res) {
    var user = new User({
        username: 'Admin',
        password: '212223'
    });
    user.save();
};

exports.indexSpell = function (req, res) {
    res.render('speller/index', {
        title: 'TakiTec'
    });
};

exports.spell = function (req, res) {

    var word = req.body.word.toLowerCase();
    var letters = word.split('');
    var wordImg = null;

    Letter.find({letter: { $in: letters }}).exec(function (err, items) {
        if (err) return res.render('500');

        function render() {
            res.render('speller/index', {
                title: 'TakiTec',
                images: images,
                size: letters.length,
                wordImg: wordImg
            });
        }

        //console.log(letters);
        //console.log(items);
        var images = [];
        letters.forEach(function (letter) {
            images.push(items.filter(function (item) {
                return item.letter == letter;
            }));
        });

        Word.findOne({ word: word}).exec(function (err, word) {
            if (err) return render();
            if (word) {
                wordImg = word.image;
            }
            render();
        });
    });
};