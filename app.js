const handlers = require('./lib/handlers')

const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

// app.get: 라우트 추가 메서드
// app.get('/', (req, res) => res.render('home'))
app.get('/', handlers.home)
// app.get('/about', (req, res) => {
//     res.render('about', { fortune: fortune.getFortune() })
// })
app.get('/about', handlers.about)

// custom 404 page
// app.use((req, res) => {
//     res.status(404)
//     res.render('404')
// })
app.use(handlers.notFound)

// custom 500 page
// app.use((err, req, res, next) => {
//     console.log(err.message)
//     res.status(500)
//     res.render('500')
// })
app.use(handlers.serverError)

if (require.main === module) {
    app.listen(port, () => console.log(
        `Express started on http://localhost:${port};` + `press Ctrl-C to terminate...`
    ))
} else {
    module.exports = app
}
