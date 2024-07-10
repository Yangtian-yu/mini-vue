import { effectWatch, reactive } from './core/index.js'

export default {
  render(context) {
    //ui
    const element = document.createElement('div')
    const text = document.createTextNode('nihao')
    const text1 = document.createTextNode(context.obj.count);
    element.append(text)
    element.append(text1)
    return element
  },


  setup() {
    const obj = reactive({
      count: 1
    })
    window.obj = obj
    return { obj }
  }
}
