const express = require('express') // Express 모듈을 가져온다.
const ejs = require('ejs') // EJS 템플릿 엔진 모듈을 가져온다
const app = express()
const port = 3000 // 서버가 실행될 포트 번호를 지정한다.


// Express에 EJS를 뷰 엔진(view engine)으로 설정한다.
// 이를 통해 .ejs 파일을 렌더링할 수 있다.
app.set('view engine', 'ejs')
// 뷰 파일(템플릿 파일)이 위치한 디렉토리를 설정한다.
// './views' 디렉토리에서 .ejs 파일을 찾는다.
app.set('viess', './views')

// static file serving
// __dirname : 현재 경로 (app.js 기준)
app.use(express.static(__dirname+'/public'))

// 루트 경로('/')로 들어오는 HTTP GET 요청을 처리한다.
app.get('/', (req, res) => { 
    // 렌더링한 index.ejs 를 반환 (문자열(파일명)만 넣어도 index.d.ts 파일에서 확장자를 붙여서 return 해줌)
    // index.ejs 라고 써도 상관없음
    res.render('index'); 
})

app.get('/blog', (req, res) => { 
    res.render('blog.ejs');
})

app.get('/users', (req, res) => { 
    res.render('users');
})

// 서버를 3000번 포트에서 실행한다.
// 서버가 성공적으로 실행되면 console에 메시지 출력
app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})

