const express = require('express') // Express
const app = express()
const port = 3000


app.get('/', (req, res) => {
    console.log('Got a GET request from Client')
    res.send('Hello World')
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

app.listen(port, () => {
    console.log(`Node Legacy App listening on port ${port}`)
})
