import { h, createTextVNode } from "../../lib/mini-vue.esm-bundler.js";
import { Foo } from "./Foo.js";

export const App = {
  name: "App",

  render() {
    const app = h("div", {}, "App");
    // const foo = h(Foo, {}, [h("p", {}, '123'), h("p", {}, '456')])
    //object key

    // const foo = h(Foo, {}, h("p", {}, '123'))
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h("p", {}, "header" + age),
          h("div", {}, "+++"),
          createTextVNode("ddd"),
        ],
        footer: () => h("p", {}, "footer"),
      }
    );
    return h("div", {}, [app, foo]);
  },

  setup() {
    return {};
  },
};
