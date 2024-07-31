import { createCompenentInstance, setupComponent } from "./compenent";
import { ShapeFlages } from "../shared/ShapeFlages";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
  //patch
  //

  patch(vnode, container);
}

function patch(vnode, container, parentComponent = null) {
  //vnode->component   container -> querySelect("#app")
  //去处理组件
  //TODO 判断vnode 是不是一个element
  //是element 那么就应该处理element
  //如何区分是element 还是component
  // processElement()
  const { type, ShapeFlage } = vnode;

  switch (type) {
    case Fragment:
      propcessFragment(vnode, container, parentComponent);
      break;

    case Text:
      propcessText(vnode, container);
      break;

    default:
      if (ShapeFlage & ShapeFlages.ELEMENT) {
        processElement(vnode, container, parentComponent);
      } else if (ShapeFlage & ShapeFlages.STATEFUL_COMPONENT) {
        processComponent(vnode, container, parentComponent);
      }
      break;
  }
}

function processElement(vnode: any, container: any, parentComponent) {
  //init
  mountElement(vnode, container, parentComponent);
}

function mountElement(vnode, container, parentComponent) {
  const { children, props, type, ShapeFlage } = vnode;
  const el = (vnode.el = document.createElement(type));

  if (ShapeFlage & ShapeFlages.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (ShapeFlage & ShapeFlages.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComponent);
  }
  for (const key in props) {
    const val = props[key];
    const isOn = (key: string) => /^on[A-Z]/.test(key);
    if (isOn(key)) {
      const event = key.slice(2).toLocaleLowerCase();
      el.addEventListener(event, val);
    } else {
      el.setAttribute(key, val);
    }
  }
  container.append(el);
}

function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach((v) => {
    patch(v, container, parentComponent);
  });
}

function processComponent(vnode: any, container: any, parentComponent) {
  //vnode->component   container -> querySelect("#app")
  //挂载组件
  moutcomponent(vnode, container, parentComponent);
}

function moutcomponent(initialVNode, container, parentComponent) {
  //vnode->component   container -> querySelect("#app")
  //instance -> {
  //   render()
  //   setup()
  //  }
  const instance = createCompenentInstance(initialVNode, parentComponent);

  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}

function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  //vnode -> patch
  //vnode -> element -> mountElement
  patch(subTree, container, instance);
  //element -> mount
  initialVNode.el = subTree.el;
}

function propcessFragment(vnode: any, container: any, parentComponent) {
  mountChildren(vnode, container, parentComponent);
}

function propcessText(vnode: any, container: any) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}
