function createElement(tag) {
  return document.createElement(tag)
}

function patchProps(el, key, prevalue, nextValue) {
  el.setAttribute(key, nextValue)
}

export function mountElement(vnode, container) {
  const { tag, props, children } = vnode
  //创建的动作
  const el = createElement(tag)
  //props
  for (const key in props) {
    const val = props[key];
    patchProps(el, key, null, val)
  }
}
