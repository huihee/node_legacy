// 설치된 외부 라이브러리를 불러오기 위해 require() 사용
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser');
const mysql = require('mysql2')
require('dotenv').config();
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('viess', './views')
// static file serving
app.use(express.static(__dirname+'/public'))
// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // bodyParser가 해당 형식을 파싱해줌
// parsing JSON
app.use(bodyParser.json()) // bodyParser가 해당 형식을 파싱해줌


// MySQL Connection Pool - db 관련 정보는 push 절대 금지에 유의(dotenv사용)
// MySQL 커넥션을 사용할 때는, 주로 커넥션 풀을 이용하여 관리하는 것이 권장된다.
const connection = mysql.createPool({
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


app.get('/', (req, res) => { 
    res.render('index'); 
})

app.get('/blog', (req, res) => { 
    res.render('blog.ejs');
})

app.get('/users', (req, res) => { 
    res.render('users');
})

// 뷰 페이지를 렌더링 하는 렌더링 설정, 라우터 함수 작성
app.get('/contact', (req, res) => { 
    res.render('contact');
})


// post 설정
app.post('/api/contact', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const memo = req.body.memo;

    const data = `${name} ${phone} ${email} ${memo}`

    const SQL_Query = `INSERT INTO contact(name, phone, email, memo, create_at, modify_at)
                      VALUES('${name}', '${phone}', '${email}', '${memo}', NOW(), NOW())`

    connectionPool.query(SQL_Query, (err, result) => {
        if (err) {
            console.error('데이터 삽입 중 에러 발생', err)
            res.status(500).send('내부 서버 오류')
        } else {
            console.log('데이터가 삽입되었습니다.');
            res.send("<script>alert('문의사항이 등록되었습니다.'); location.href='/';</script>"); // 인라인 코딩 금지 (지금만 예외,,)
        }
    })
})

// 조회
app.get('/contactList', (req, res) => {
   const selectQuery = `SELECT * FROM contact ORDER BY ID DESC`

   connectionPool.query(selectQuery, (err, result) => {
        if (err) {
            console.error('데이터 조회 중 에러 발생', err)
            res.status(500).send('내부 서버 오류')
        } else {
            console.log('데이터가 조회되었습니다.');
            console.log(result);
            res.render('contactList', {lists:result});
        }
    })
})

app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})