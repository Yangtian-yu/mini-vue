import { h } from '../../lib/mini-vue.esm-bundler.js'

export const App = {
  //.vue
  // <template></template>
  //render
  render() {
    return h("div", "hi," + this.msg)
  },
  setup() {
    //composition api
    return {
      msg: "mini -  vue"
    }
  }

}
