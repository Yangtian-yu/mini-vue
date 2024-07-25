import { h } from '../../lib/mini-vue.esm-bundler.js'
import { Foo } from './Foo.js'

window.self = null

export const App = {
  name: "App",
  //.vue
  // <template></template>
  //render
  render() {
    window.self = this
    return h("div", {
      id: "root",
      class: "heard",

    },

      //this
      //setupState
      //this.$el
      // "hi " + this.msg,
      [h("div", {}, 'hi,' + this.msg), h(Foo, {
        onAdd(a, b) {

          console.log("onAdd", a, b)
        },
        onAddFoo(a, b) {
          console.log("addFoo", a, b)
        }
      })]
      // [h('p', { class: "red" }, 'red'), h('h1', { class: "blue" }, 'blue')]
    )
  },
  setup() {
    //composition api
    return {
      msg: "mini -  vue"
    }
  }

}
