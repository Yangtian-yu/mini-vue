export class Dep {
  constructor(value) {
    this._val = value
    this.effects = new Set()
  }


  get value() {
    this.depend()
    return this._val
  }

  set value(val) {
    this._val = val
    this.notice()
  }

  depend() {
    if (effectCurrent) {
      this.effects.add(effectCurrent)
    }
  }

  notice() {
    this.effects.forEach(item => {
      item()
    })
  }

}


let effectCurrent = null

export function effectWatch(fn) {
  effectCurrent = fn
  fn()
  effectCurrent = null
}


const targetMaps = new Map()

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {

      let dep = getDep(target, key)
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, value) {
      let dep = getDep(target, key)
      const result = Reflect.set(target, key, value)
      dep.notice()
      return result
    }

  })
}
function getDep(raw, key) {
  let depMap = targetMaps.get(raw)
  if (!depMap) {
    depMap = new Map()
    targetMaps.set(raw, depMap)
  }
  let dep = depMap.get(key)
  if (!dep) {
    dep = new Dep()
    depMap.set(key, dep)
  }
  return dep
}

