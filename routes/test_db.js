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
});

router.post('/add', async (req, res) => {
  const { username, password} = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO test (username, password) VALUES ($1, $2)',
      [username, password]
    );
  } catch (err) {
    if (err.code === '23505') {
      res.status(400).send({ success: false, message: "이미 존재하는 사용자 이름입니다." });
    } else {
      console.error(err);
      res.status(500).send({ success: false, message: "서버 오류" });
    }
  }
});

module.exports = router;

console.log("/routes/test_db.js");