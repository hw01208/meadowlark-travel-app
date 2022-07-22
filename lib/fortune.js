const fortuneCookies = [
    "인생이 행복해지는 비결은 끊임없이 작은선물을 받는 것이다.",
    "평범하다는 것은 '현대판 노예'라는 뜻이다.",
    "매일 1퍼센트의 차이가 3개월을 넘기면 100퍼센트의 차이를 만든다는 사실을 기억하라.",
    "실패는 언제나 찾아오는 친구이며 성공은 어쩌다 찾아오는 손님이다.",
    "그저 첫 발걸음을 떼면 됩니다. 계단 전체를 올려다볼 필요도 없습니다. 그저 첫 발걸음만 떼면 됩니다."
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random() * fortuneCookies.length)
    return fortuneCookies[idx]
}