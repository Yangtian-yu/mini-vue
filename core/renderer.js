function createElement(tag) {
  return document.createElement(tag)
}

function patchProps(el, key, prevalue, nextValue) {
  if (nextValue === null) {
    el.removeAttribute(key)
  } else {
    el.setAttribute(key, nextValue)
  }

}

function insert(el, parent) {
  parent.append(el)
}


function createTextNode(text) {
  return document.createTextNode(text)
}


function remove(el, parent) {
  parent.removeChild(el)
}

export function mountElement(vnode, container) {
  const { tag, props, children } = vnode
  //创建的动作
  const el = (vnode.el = createElement(tag))
  //props
  for (const key in props) {
    const val = props[key];
    patchProps(el, key, null, val)
  }
  //children
  if (typeof children === 'string') {
    insert(createTextNode(children), el)
  } else if (Array.isArray(children)) {
    children.forEach(e => {
      mountElement(e, el)
    })
  }
  //insert
  insert(el, container)
}

//n1->oldVnode

//n2-> newVnode
export function diff(n1, n2) {
  //1.tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWith(createElement(n2.tag))
  } else {
    //props
    //1.
    //new {a,b} 
    //old {a}
    //2.
    //new {a}
    //old {a,b}
    const oldProps = n1.props
    const newProps = n2.props
    const el = (n2.el = n1.el)
    if (newProps) {
      for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key])
        }
      }
    }
    if (oldProps) {
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null)
        }
      }
    }

    // 3.children
    // chidren 
    //new -> string  array
    // old -> string array 
    //1.  new string old string
    //2.  new string old array
    //3.  new array  old string
    // 4. new array  old array
    const newChildren = n2.children
    const oldChildren = n1.children
    if (typeof newChildren === 'string') {
      if (oldChildren === "string") {
        if (newChildren !== oldChildren) {
          el.innerText = newChildren
        }
      } else if (Array.isArray(oldChildren)) {
        el.innerText = newChildren
      }
    } else if (Array.isArray(newChildren)) {
      if (typeof oldChildren === 'string') {
        el.innerText = ''
        newChildren.forEach(i => {
          mountElement(i, el)
        })
      } else if (Array.isArray(oldChildren)) {
        //暴力解法
        //new -> [a,b,c]
        // old -> [a,b,c]
        //1.依次对比
        //2.new ->old add
        // new -> [a,b,c]
        // old -> [a,b] 
        //3.new ->old remove
        // new -> [a,b]
        // old -> [a,b,c]
        //1.依次对比
        const length = Math.min(newChildren.length, oldChildren.length)
        for (let i = 0; i < length; i++) {
          diff(oldChildren[i], newChildren[i])
        }
        //2.new ->old add
        if (newChildren.length > length) {
          for (let i = length; i < newChildren.length; i++) {
            const vNode = newChildren[i]
            mountElement(vNode, el)
          }
        }
        //3.new ->old remove
        if (oldChildren.length > length) {
          for (let i = length; i < oldChildren.length; i++) {
            const vNode = oldChildren[i]
            console.log("---")
            console.log(vNode)
            remove(vNode.el, el)
          }
        }
      }
    }
  }



}
