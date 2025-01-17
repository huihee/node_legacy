const mysql = require('mysql2')
require('dotenv').config();

// MySQL connection Pool
const connectionPool = mysql.createPool({
    host: process.env.DB_HOST, // 로컬에 구축했기 때문에
    user: process.env.DB_USER, // root로 접속
    password: process.env.DB_PW,
    port : process.env.DB_PORT, // mysql 설치시 설정된 포트
    database: process.env.DB_NAME,
    connectionLimit: 10, // 최대 연결 수 설정(필요시)
    insecureAuth: true,
});

// MySQL connection check
connectionPool.getConnection((err, connection) => {
    if (err) {
        console.error('MySQL 연결 중 에러 발생: ', err);
    } else {
        console.log('MySQL에 연결되었습니다.');
        connection.release();
    }
});

module.exports = connectionPool;
