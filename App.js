import { effectWatch, reactive, h } from './core/index.js'

export default {
  render(context) {
    //ui
    // const element = document.createElement('div')
    // const text = document.createTextNode('nihao')
    // const text1 = document.createTextNode(context.obj.count);
    // element.append(text)
    // element.append(text1)
    return h("div", { id: "foo" }, [h("p", {}, 'nihao'), h("p", {}, context.obj.count)])

  },


  setup() {
    const obj = reactive({
      count: 1
    })
    window.obj = obj
    return { obj }
  }
}
