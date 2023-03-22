const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');

const PORT = 44444;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.dirname = __dirname;
    next();
});

app.get('/', (req, res) => {
    res.render('index');
});

const server = app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});