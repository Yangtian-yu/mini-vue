import { createApp } from '../../lib/mini-vue.esm-bundler.js'
import { App } from './App.js'

//vue3语法
const rootContainer = document.querySelector('#app')
createApp(App).mount(rootContainer)
