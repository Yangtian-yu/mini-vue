// import { ref, effect } from "./node_modules/@vue/reactivity/dist/reactivity.esm-browser.js";
// const a = ref(10)
// let b = 0;

// effect(() => {
//   b = a.value + 10
//   console.log(b)
// })


// a.value = 20

// import { Dep, effectWatch, reactive } from './core/index.js'


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




// App.render(App.setup())

import { createApp } from './core/index.js'
import App from './App.js'

createApp(App).mount(document.querySelector('#app'))
