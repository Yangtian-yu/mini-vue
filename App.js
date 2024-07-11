import { effectWatch, reactive, h } from './core/index.js'

window.h = h
export default {
  render(context) {
    //ui
    // const element = document.createElement('div')
    // const text = document.createTextNode('nihao')
    // const text1 = document.createTextNode(context.obj.count);
    // element.append(text)
    // element.append(text1)
    // return h("div", { id: "foo" }, [h("p", {}, 'nihao'), h("p", {}, String(context.obj.count))])
    //1.test diff tag
    // return h(context.obj.tag, {}, "1")
    //2.test props 1 add
    // return h('div', context.obj.props, "")
    //3.test props 2 remove
    // return h("div", context.obj.props, "")
    //test children
    // return h("div", {}, context.obj.children)
    // 7. test children new array -> old array
    return h("div", {}, context.obj.children)
  },


  setup() {
    const obj = reactive({
      count: 1,
      tag: "div",
      props: {
        a: "a",
        b: "bb"
      },
      children: [h("div", {}, "10"), h("div", {}, "888")]
    })
    window.obj = obj
    return { obj }
  }
}
