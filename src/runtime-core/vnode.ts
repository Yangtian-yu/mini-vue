import { ShapeFlages } from "../shared/ShapeFlages";

export const Fragment = Symbol("Fragment");
export const Text = Symbol("Text");

export function createVNode(type, props?, children?) {
  const vnode = {
    type,
    props,
    children,
    ShapeFlage: getShapeFlag(type),
    el: null,
  };

  if (typeof children === "string") {
    vnode.ShapeFlage |= ShapeFlages.TEXT_CHILDREN;
  } else if (Array.isArray(children)) {
    vnode.ShapeFlage |= ShapeFlages.ARRAY_CHILDREN;
  }

  //处理solt
  //组件 + children object
  if (vnode.ShapeFlage & ShapeFlages.STATEFUL_COMPONENT) {
    if (typeof children === "object") {
      vnode.ShapeFlage |= ShapeFlages.SLOT_CHILDREN;
    }
  }
  return vnode;
}
function getShapeFlag(type: any) {
  return typeof type === "string"
    ? ShapeFlages.ELEMENT
    : ShapeFlages.STATEFUL_COMPONENT;
}

export function createTextVNode(text: string = " ") {
  return createVNode(Text, {}, text);
}
