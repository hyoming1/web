const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  console.log(username,password);
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );
    if (result.rows.length > 0) {
      res.status(200).send({ success: true, message: '로그인 성공!' });
    } else {
      res.status(400).send({ success: false, message: '잘못된 사용자 이름 또는 비밀번호입니다.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: '서버 오류' });
  }
});


/*
// 데이터베이스 연결 테스트
router.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        res.render('test_login', { dbConnected: true });
        client.release();
      } catch (err) {
        console.error(err);
        if (!res.headersSent) {
            res.render('test_login', { dbConnected: false });
        }
    }
});*/
/* 
router.post('/add', async (req, res) => {
  const { username, password} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO test (username, password) VALUES ($1, $2)',
      [username, password]
    );
    res.status(200).send({ success: true, message: "사용자가 추가되었습니다." });
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).send({ success: false, message: "이미 존재하는 사용자 이름입니다." });
    } else {
      console.error(err);
      res.status(500).send({ success: false, message: "서버 오류" });
    }
  }
});*/

module.exports = router;

console.log("/routes/login.js");