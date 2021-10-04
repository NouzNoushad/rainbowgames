const express = require('express');
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const GameRoute = require('./routes/games');
dotenv.config({ path: './config/.env' });

const PORT = process.env.PORT || 8000;

//ejs engine
app.set('view engine', 'ejs');

//middlewares
app.use(expressLayouts);
if (process.env.NODE_ENV === "production") {
    app.use(express.static('public'));
}


app.use('/', GameRoute);

app.listen(PORT, () => console.log(`Server running on port, http://localhost:${PORT}`));