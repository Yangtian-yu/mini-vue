// import { ref, effect } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";
// const a = ref(10)
// let b = 0;

// effect(() => {
//   b = a.value + 10
//   console.log(b)
// })


// a.value = 20

import { Dep, effectWatch, reactive } from './core/index.js'


// const a = new Dep(10)
// let b = 0

// effectWatch(() => {
//   b = a.value + 10
//   console.log(b)
// })

// a.value = 20

// const user = reactive({
//   age: 10
// })

// let nextAge = 0;
// effectWatch(() => {
//   nextAge = user.age + 1
//   console.log(nextAge)
// })
// user.age++;

// const context = reactive({
//   count: 0
// })

// window.context = context



const App = {
  render(context) {
    effectWatch(() => {
      //ui
      document.querySelector('#app').textContent = ``
      const element = document.createElement('div')
      const text = document.createTextNode('nihao')
      const text1 = document.createTextNode(context.obj.count);
      element.append(text)
      element.append(text1)
      document.querySelector('#app').append(element)
    })
  },


  setup() {
    const obj = reactive({
      count: 1
    })
    window.obj = obj
    return { obj }
  }
}
App.render(App.setup())


