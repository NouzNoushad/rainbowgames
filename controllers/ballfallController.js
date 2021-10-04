const ballfall = (req, res) => {

    try {
        return res.render('ballfall');
    } catch (err) {
        console.log(err);
    }
}

module.exports = ballfall;