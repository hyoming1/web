/*
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'public', 'images');
const imageFiles = fs.readdirSync(imagesDir).filter(file => file.endsWith('.jpg'));
const images = imageFiles.map(file => `/images/${file}`);

router.get('/', function (req, res, next) {
  res.render('board/test', { images });
});

router.get('/image/:filename', (req, res) => {
  const filename = req.params.filename;
  res.sendFile(path.join(imagesDir, filename));
});

// ejs 파일에서 images 변수에 접근할 수 있도록 추가
router.get('/:name', (req, res) => {
  const boardName = req.params.name;
  res.render(`board/${boardName}`, { nameTest: boardName, images });
});

module.exports = router;
*/