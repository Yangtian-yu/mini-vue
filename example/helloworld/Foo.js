import { h } from '../../lib/mini-vue.esm-bundler.js'

export const Foo = {
  setup(props, { emit }) {
    const emitAdd = () => {
      console.log("emit,add")
      emit('add', 1, 2)
      emit('add-foo', 1, 2)
    }
    return {
      emitAdd
    }
  },
  render() {
    const btn = h("button", {
      onClick: this.emitAdd
    }, "emitAdd")
    const foo = h("p", {}, 'foo')
    return h('div', {}, [btn, foo])
  }
}
