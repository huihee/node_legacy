// 설치된 외부 라이브러리를 불러오기 위해 require() 사용
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser');
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

app.get('/', (req, res) => {
    const selectQuery = `SELECT id,
                                name,
                                phone,
                                email,
                                memo,
                                DATE_FORMAT(create_at, '%Y-%m-%d') AS create_at,
                                DATE_FORMAT(modify_at, '%Y-%m-%d') AS modify_at,
                                status 
                            FROM contact 
                            ORDER BY ID DESC`;
  
    connectionPool.query(selectQuery, (err, result) => {
      if (err) {
        console.error('데이터 조회 중 에러 발생', err);
        res.status(500).send('내부 서버 오류');
      } else {
        console.log('데이터가 조회되었습니다.');
        // 'index.ejs'로 데이터 전달
        res.render('index', { lists: result });
      }
    });
  });

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
    const selectQuery = `SELECT id,
                                name,
                                phone,
                                email,
                                memo,
                                DATE_FORMAT(create_at, '%Y-%m-%d') AS create_at,
                                DATE_FORMAT(modify_at, '%Y-%m-%d') AS modify_at,
                                status 
                            FROM contact 
                            ORDER BY ID DESC`;

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
});

app.delete('/api/contactDelete/:id', (req, res) => {
    const id = req.params.id;
    const deleteQuery = `DELETE FROM contact WHERE ID='${id}'`
    connectionPool.query(deleteQuery, (err, result) => {
        if (err) {
            console.error('데이터 삭제 중 에러 발생', err)
            res.status(500).send('내부 서버 오류')
        } else {
            console.log('데이터가 삭제되었습니다.');
            console.log(result);
            res.send("<script>alert('문의사항이 삭제되었습니다.'); location.href='/';</script>");
        }
    })
})

app.put('/api/contactUpdate/:id', (req, res) => {
    const id = req.params.id;
    const status = "done";
    const updateQuery = `UPDATE contact SET status='${status}' WHERE id='${id}'`

    connectionPool.query(updateQuery, (err, result) => {
        if (err) {
            console.error('데이터 수정 중 에러 발생', err)
            res.status(500).send('내부 서버 오류')
        } else {
            console.log('데이터가 수정되었습니다.');
            console.log(result);
            res.send("<script>alert('문의사항의 상태가 변경되었습니다.'); location.href='/';</script>");
        }
    })
})


app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})
