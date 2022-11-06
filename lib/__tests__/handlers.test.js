// 테스트 코드 핸들러 임포트
const handlers = require('../handlers')

// 테스트 기능에 관한 설명: 홈페이지가 렌더링되는 게 확실한지 테스트
test('home page renders', () => {
    const req = {}
    const res = { render: jest.fn() } // 렌더링 함수 생성
    handlers.home(req, res)
    expect(res.render.mock.calls.length).toBe(1) // 첫 번째로 호출
    expect(res.render.mock.calls[0][0]).toBe('home') // [0]][0] 위 상황에서 전달받은 매개변수 중 첫 번째 (home)
})

// 라우트에 대한 테스트
test('about page renders with fortune', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.about(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('about')
    // 최소 한 글자 이상의 문자열로 이루어진 두 번째 매개변수가 있다는 어시션 추가
    expect(res.render.mock.calls[0][1]).toEqual(expect.objectContaining({
        fortune: expect.stringMatching(/\W/)
    }))
})

// 라우트에 대한 테스트
test('404 handler renders', () => {
    const req = {}
    const res = { render: jest.fn() }
    handlers.notFound(req, res)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('404')
})

// 라우트에 대한 테스트
test('500 handler renders', () => {
    const err = new Error('some error')
    const req = {}
    const res = { render: jest.fn() }
    const next = jest.fn()
    handlers.serverError(err, req, res, next)
    expect(res.render.mock.calls.length).toBe(1)
    expect(res.render.mock.calls[0][0]).toBe('500')
})

