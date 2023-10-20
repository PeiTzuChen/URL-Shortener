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
    // console.log('list',list)
  } catch (error) {
    // console.log('list沒東西')
  }

const generateRandom = require('./js_module/generateRandom.js');
const BASE_URL = 'http://localhost:3000/'

//收到資料
app.post('/',(req,res) => {
const originLink = req.body.link
const findExistLink = (element) =>  element.origin.includes(originLink) //判斷原網址是否存在JASON
let shortenedLinkForRender = '' //給html render的短網址變數
const shortenedLinkData = BASE_URL+generateRandom() //產生一組短網址

if (!originLink.startsWith('http')) {
  res.render('err',{warning : 'Please paste correct form of link!'})
}

else if (list.some(findExistLink)) { //如果已存在資料則產生相同短連結
  const findExistElement = list.filter(element => element.origin === originLink
  )
  shortenedLinkForRender = findExistElement[0].shortened
  res.render('index',{shortenedLinkForRender})
}

else {  //建立物件儲存原網址、短網址與亂碼放入list傳進JASON
  const shortenedLinkObject = {
    origin: originLink,
    shortened: shortenedLinkData,
    randomString: shortenedLinkData.slice(22,shortenedLinkData.length)
  }
  shortenedLinkForRender = shortenedLinkData
  list.push(shortenedLinkObject)
  fs.writeFileSync('data.json', JSON.stringify(list, null, 2));
  res.render('index',{shortenedLinkForRender})
}
})

app.get('/:randomLink', (req,res) => {
const randomStringData = req.params.randomLink
const findLinkElement = list.filter(element => element.randomString === randomStringData
)
const originLink = findLinkElement[0].origin
res.redirect(originLink)
})

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
} )




