const pingpong = (req, res) => {

    try {
        return res.render('pingpong');
    } catch (err) {
        console.log(err);
    }
}

module.exports = pingpong;