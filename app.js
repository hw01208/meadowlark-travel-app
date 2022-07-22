const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()
const port = process.env.PORT || 3000

// 핸들바 뷰 엔진 설정
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// app.get: 라우트 추가 메서드
app.get('/', (req, res) => res.render('home'))
app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    res.render('about', { fortune: randomFortune })
})

// custom 404 page
app.use((req, res) => {
    res.status(404)
    res.render('404')
})

// custom 500 page
app.use((err, req, res, next) => {
    console.log(err.message)
    res.status(500)
    res.render('500')
})

const fortunes = [
    "인생이 행복해지는 비결은 끊임없이 작은선물을 받는 것이다.",
    "평범하다는 것은 '현대판 노예'라는 뜻이다.",
    "매일 1퍼센트의 차이가 3개월을 넘기면 100퍼센트의 차이를 만든다는 사실을 기억하라.",
    "실패는 언제나 찾아오는 친구이며 성공은 어쩌다 찾아오는 손님이다.",
    "그저 첫 발걸음을 떼면 됩니다. 계단 전체를 올려다볼 필요도 없습니다. 그저 첫 발걸음만 떼면 됩니다."
]

app.listen(port, () => console.log(
    `Express started on http://localhost:${port};` + `press Ctrl-C to terminate...`
))