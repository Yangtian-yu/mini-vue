import { h, getCurrentInstance } from "../../lib/mini-vue.esm-bundler.js";

export const Foo = {
  setup() {
    const instance = getCurrentInstance();
    console.log('Foo:', instance)
    return {}
  },
  render() {
    return h('div', {}, 'foo')
  },
};
