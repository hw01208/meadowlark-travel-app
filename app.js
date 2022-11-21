
const express = require('express')
const expressHandlebars = require('express-handlebars')

const handlers = require('./lib/handlers')
const weatherMiddleware = require('./lib/middleware/weather')

const app = express()

// 핸들바 뷰 엔진 설정
app.engine('.hbs', expressHandlebars({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections)
                this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
}))
app.set('view engine', '.hbs')

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddleware)

// X-Powered-By 헤더 비활성화
// app.get('*', (req, res) => {
//     res.send(`Open your dev tools and examine your headers; ` +
//         `you'll notice there is no x-powered-by header!`)
// })

// app.get: 라우트 추가 메서드
// app.get('/', (req, res) => res.render('home'))
app.get('/', handlers.home)
// app.get('/about', (req, res) => {
//     res.render('about', { fortune: fortune.getFortune() })
// })
app.get('/about', handlers.about)

// header info page
// app.get('/headers', (req, res) => {
//     res.type('text/plain')
//     const headers = Object.entries(req.headers)
//         .map(([key, value]) => `${key}: ${value}`)
//     res.send(headers.join('\n'))
// })

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
