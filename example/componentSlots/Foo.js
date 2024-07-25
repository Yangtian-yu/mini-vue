import { h, renderSlots } from "../../lib/mini-vue.esm-bundler.js";

export const Foo = {
  setup() {
    return {};
  },
  render() {
    const foo = h("p", {}, "foo");
    //renderSlots
    console.log(this.$slots);
    //1. 获取到要渲染的元素
    //2.要获取的渲染的位置
    const age = 18
    return h("div", {}, [
      renderSlots(this.$slots, "header", { age }),
      foo,
      renderSlots(this.$slots, "footer"),
    ]);
  },
};
