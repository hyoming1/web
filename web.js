const express = require('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

// 게시판 라우팅 추가하기
app.get('/board/:name', (req, res) => {
    const boardName = req.params.name;
    res.render(`board/${boardName}`, { nameTest: boardName });
});

app.listen(8080, () => {
    console.log('Server is listening on port 8080.')
})