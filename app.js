const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')
const fs = require('fs'); 



app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false })); //解析POST data

//主畫面
app.get('/',(req,res) => {
res.render('index')
})


let data = JSON.parse(fs.readFileSync('data.json', 'utf8'))


//收到資料
app.post('/',(req,res) => {
const originURL = req.body
console.log('data',data)

res.render('index')

})



app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
} )




