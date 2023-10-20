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


//使用list變數裝資料，讀取本地JSON檔（同步方式）
let list = [];
  try {
    list = JSON.parse(fs.readFileSync('data.json', 'utf8'));
    console.log('list',list)
  } catch (error) {
    console.log('list沒東西')
  }

const generateRandom = require('./js_module/generateRandom.js');
const BASE_URL = 'http://localhost:3000/'

//收到資料
app.post('/',(req,res) => {
const originURL = req.body.link
console.log('originURL',originURL)

if (!originURL.startsWith('http')) {
  res.render('err',{warning : 'Please paste correct form of link!'})
}

else {  //建立物件儲存原網址與短網址
  const shortenedURL = {
    origin: originURL,
    shortened: BASE_URL+generateRandom()
  }
  list.push(shortenedURL)
  fs.writeFileSync('data.json', JSON.stringify(list, null, 2));
  res.render('index')
}
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
} )




