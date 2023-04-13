require('dotenv').config();

const express = require('express')
const app = express()
const path = require('path')

const boardRouter = require('./routes/board');
const LoginRouter = require('./routes/login');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/')));
app.use(express.static(path.join(__dirname, 'public')));

// board 라우터 등록하기
app.use('/board', boardRouter);
app.use('/login', LoginRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080.')
})

console.log("web.js");