const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/test_image', (req, res) => {
    const imageDir = path.join(__dirname, '..', 'public', 'images', 'test');
    const imageFiles = fs.readdirSync(imageDir);
    const images = imageFiles.map(file => `/images/test/${file}`);
    //res.render('board/test', { images });
    res.render('board/test_image', { images, nameTest: 'test_image' });
  });
  
  router.get('/:name', (req, res) => {
    const boardName = req.params.name;
    if (boardName === 'test_image') {
      return res.redirect('/board/test_image');
    }
    res.render(`board/${boardName}`, { nameTest: boardName });
  });

module.exports = router;

console.log("/routes/board.js");