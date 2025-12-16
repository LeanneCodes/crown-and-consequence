const { renderDOM } = require('./helpers');
// JUST A TEMPLATE OF TESTS FOR NOW, TO GIVE AN IDEA OF WHAT IS EXPECTED.
let dom;
let document;

//index.html tests
describe('index.html', () => {
  beforeEach(async () => {
    dom = await renderDOM('./public/index.html');
    document = await dom.window.document;
  })
  
  it('has a login button', () => {
    const btn = document.querySelector('button')
    expect(btn).toBeTruthy
    expect(btn.innerHTML).toBe("Log In")
  })

//   it('h1 is empty when website loads', () => {
//     const h1 = document.querySelector('h1')
//     expect(h1).toBeTruthy
//     expect(h1.innerHTML).toContain('')
//   })

//   it('displays morning when the btn is clicked', () => {
//     const btn = document.querySelector('button')
//     btn.click();
//     const h1 = document.querySelector('h1')
//     expect(h1.innerHTML).toContain('morning')
//   })

//   it('displays dark mode', () => {
//     const body = document.querySelector('body')
//     const darkModeBtn = document.querySelector('#dark-mode')

//     darkModeBtn.click()
//     expect(body.className).toBe('dark-mode')
//   })

//   it('adds the input value to the h1', () => {
//     const form = document.querySelector('form')
//     const h1 = document.querySelector('h1')
  
//     const input = document.querySelector('#name')
//     input.value = 'emile'
//     form.dispatchEvent(new dom.window.Event('submit'));
  
//     expect(h1.innerHTML).toContain(input.value)
//   })

//   it('switches back to light mode', () => {
//     const body = document.querySelector('body')
//     const darkModeBtn = document.querySelector('#dark-mode')

//     darkModeBtn.click()
//     darkModeBtn.click()
//     expect(body.className).toBe('')
//   })
})
