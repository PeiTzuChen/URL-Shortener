const express = require('express')
const app = express()
const port = 3000
const { engine } = require('express-handlebars')

app.use(express.static('public'))

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', './views');


app.get('/',(req,res) => {
res.redirect('/shortlink')

})



app.get('/shortlink',(req,res) => {
res.render('finished')

})



app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`)
} )




