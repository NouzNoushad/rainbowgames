const game =  (req, res) => {

    try {
        return res.render('games');
    } catch (err) {
        console.log(err);
    }
}

module.exports = game;