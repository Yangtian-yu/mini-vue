import { createCompenentInstance, setupComponent } from "./compenent";
import { ShapeFlages } from "../shared/ShapeFlages";

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
  console.log(vnode.type);
  const { ShapeFlage } = vnode;
  if (ShapeFlage & ShapeFlages.ELEMENT) {
    processElement(vnode, container);
  } else if (ShapeFlage & ShapeFlages.STATEFUL_COMPONENT) {
    processComponent(vnode, container);
  }
}

function processElement(vnode: any, container: any) {
  //init
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const { children, props, type, ShapeFlage } = vnode;
  const el = (vnode.el = document.createElement(type));

  if (ShapeFlage & ShapeFlages.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (ShapeFlage & ShapeFlages.ARRAY_CHILDREN) {
    mountChildren(vnode, el);
  }
  for (const key in props) {
    el.setAttribute(key, props[key]);
  }
  container.append(el);
}

function mountChildren(vnode, container) {
  vnode.children.forEach((v) => {
    patch(v, container);
  });
}

function processComponent(vnode: any, container: any) {
  //vnode->component   container -> querySelect("#app")
  //挂载组件
  moutcomponent(vnode, container);
}

function moutcomponent(initialVNode, container) {
  //vnode->component   container -> querySelect("#app")
  //instance -> {
  //   render()
  //   setup()
  //  }
  const instance = createCompenentInstance(initialVNode);

  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  //vnode -> patch
  //vnode -> element -> mountElement
  patch(subTree, container);
  //element -> mount
  initialVNode.el = subTree.el;
}
