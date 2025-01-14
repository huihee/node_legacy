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


// MySQL Connection - push 절대 금지에 유의(dotenv사용)
const connection = mysql.createConnection({
    host: process.env.DB_HOST, // 로컬에 구축했기 때문에
    user: process.env.DB_USER, // root로 접속
    passward: process.env.DB_PW,
    port : DB_PORT, // mysql 설치시 설정된 포트
    database: process.env.DB_NAME,
    insecureAuth: true,
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

    res.send(data) // data를 응답으로
})

app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})