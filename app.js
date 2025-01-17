// 설치된 외부 라이브러리를 불러오기 위해 require() 사용
const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser');
const router = requrie('./routes/router')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('viess', './views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname+'/public'))
app.use('/', router)

app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})
