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
/*
// 로그인 처리
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    try {
      // 사용자 정보 조회
      const result = await pool.query('SELECT * FROM test WHERE username = $1', [username]);
  
      if (result.rows.length > 0) {
        // 사용자가 존재하는 경우, 비밀번호 검증
        const user = result.rows[0];
  
        if (user.password === password) {
          res.send(`<h1>${username}님, 안녕하세요!</h1>`);
          console.log(`[${new Date().toLocaleString()}] ${req.ip} - 로그인 성공: ${username}`);
        } else {
          res.send('<h1>로그인 실패: 잘못된 비밀번호</h1>');
          console.log(`[${new Date().toLocaleString()}] ${req.ip} - 잘못된 비밀번호: ${username}`);
        }
      } else {
        res.send('<h1>로그인 실패: 사용자가 존재하지 않음</h1>');
        console.log(`[${new Date().toLocaleString()}] ${req.ip} - 사용자가 존재하지 않음: ${username}`);
      }
    } catch (err) {
      console.error(err);
      res.send('<h1>로그인 실패: 서버 오류</h1>');
    }
  });*/

module.exports = router;

console.log("/routes/test_db.js");