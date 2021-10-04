const snake = (req, res) => {

    try {
        return res.render('snake');
    } catch (err) {
        console.log(err);
    }
}

module.exports = snake;