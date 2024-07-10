import { effectWatch } from './reactivity.js'
export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const setupResult = rootComponent.setup()
      effectWatch(() => {
        rootContainer.textContent = ``
        const element = rootComponent.render(setupResult)
        rootContainer.append(element)
      })
    }
  }
}
