import { effectWatch, mountElement, diff } from './index.js'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup()
      let isOnmount = true
      let prevSubtree = null


      effectWatch(() => {
        if (isOnmount) {
          isOnmount = false
          rootContainer.textContent = ``
          const subTree = rootComponent.render(setupResult)
          prevSubtree = subTree
          mountElement(subTree, rootContainer)
        } else {
          rootContainer.textContent = ``
          const subTree = rootComponent.render(setupResult)
          console.log('prevSubtree', prevSubtree)
          console.log('subTree', subTree)
          diff(prevSubtree, subTree)
          mountElement(subTree, rootContainer)
        }

        // rootContainer.append(element)
      })
    }
  }
}
