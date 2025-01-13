/*==========================================================
 * require('express') : Express 모듈을 불러온다.
 * express() : Express 앱 객체를 생성한다.
 * app-get : 특정 경로에 대해 요청-응답 동작을 정의한다.
 * app.listen : 지정된 포트에서 서버를 시작하고 요청을 수신한다.
 ==========================================================*/


// Express 모듈을 가져온다.
const express = require('express')

// Express 애플리케이션 객체를 생성한다.
const app = express()
const port = 3000

// HTTP GET 요청이 '/' 경로로 들어왔을 때 실행될 라우트를 정의한다.
// 클라이언트가 '/' 경로로 요청을 보내면
app.get('/', (req, res) => { // 
    console.log('Got a GET request from Client')
    res.send('<H1>Hello</H1>') // 클라이언트에게 "Hello World"라는 응답을 보낸다.
})

app.post('/', (req, res) => {
    console.log('Got a POST request from Client')
    res.send('Hello World')
})

app.put('/user', (req, res) => {
    console.log('Got a PUT request from Client')
    res.send('Hello World')
})

app.delete('/user', (req, res) => {
    console.log('Got a DELETE request from Client')
    res.send('Hello World')
})

// 서버를 3000번 포트에서 실행한다.
// 서버가 성공적으로 실행되면 console에 메시지 출력
app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})

