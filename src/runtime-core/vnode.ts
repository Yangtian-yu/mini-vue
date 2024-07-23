import { ShapeFlages } from "../shared/ShapeFlages";

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

  return vnode;
}
function getShapeFlag(type: any) {
  return typeof type === "string"
    ? ShapeFlages.ELEMENT
    : ShapeFlages.STATEFUL_COMPONENT;
}
