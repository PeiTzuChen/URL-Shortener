const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/',(req,res) => {
res.redirect('/shortlink')

})

app.get('/shortlink',(req,res) => {
res.sendFile(__dirname + '/public/main.html');


})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
} )

