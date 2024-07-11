import { effectWatch, mountElement } from './index.js'

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup()
      effectWatch(() => {
        rootContainer.textContent = ``
        const subTree = rootComponent.render(setupResult)
        console.log(subTree)
        mountElement(subTree)
        // rootContainer.append(element)
      })
    }
  }
}
