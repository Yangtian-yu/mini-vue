import { render } from "./renderer";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  // rootComponenta -> app
  return {
    mount(rootContainer) {
      //  rootContainer ->  "#app"
      //先 vnode
      //component -》 vnode
      //所有的逻辑操作 都会基于 vnode 做处理
      const vnode = createVNode(rootComponent);
      //vnode-> app -> {type:{render(),setup()}}
      render(vnode, rootContainer);
    },
  };
}
