import { h } from '../../lib/mini-vue.esm-bundler.js'

window.self = null

export const App = {
  //.vue
  // <template></template>
  //render
  render() {
    window.self = this
    return h("div", {
      id: "root",
      class: "heard"
    },

      //this
      //setupState
      //this.$el
      "hi " + this.msg
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
