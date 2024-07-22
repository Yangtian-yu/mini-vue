import { createCompenentInstance, setupComponent } from "./compenent";

export function render(vnode, container) {
  //patch
  //

  patch(vnode, container);
}

function patch(vnode, container) {
  //vnode->component   container -> querySelect("#app")
  //去处理组件
  //TODO 判断vnode 是不是一个element
  //是element 那么就应该处理element
  //如何区分是element 还是component
  // processElement()
  processComponent(vnode, container);
}

function processComponent(vnode: any, container: any) {
  //vnode->component   container -> querySelect("#app")
  //挂载组件
  moutcomponent(vnode, container);
}

function moutcomponent(vnode, container) {
  //vnode->component   container -> querySelect("#app")
  //instance -> {
  //   render()
  //   setup()
  //  }
  const instance = createCompenentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render();
  //vnode -> patch
  //vnode -> element -> mountElement
  patch(subTree, container);
}
