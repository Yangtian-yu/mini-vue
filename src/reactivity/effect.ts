import { extend } from "../shared";

let activeEffect;
let shouldTrack;

class ReactiveEffect {
  private _fn: any;
  deps = [];
  active = true;
  onStop?: () => void;
  constructor(fn, public scheduler?) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    //1.会收集依赖
    //shouldTrack 来做区分
    if (!this.active) {
      return this._fn();
    }

    shouldTrack = true;
    activeEffect = this;

    const result = this._fn();

    //reset
    shouldTrack = false;
    return result;
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}

function cleanupEffect(effect) {
  effect.deps.forEach((dep: any) => {
    dep.delete(effect);
  });
}

const targetMap = new Map();

export function track(target, key) {
  if (!activeEffect) return;
  if (!shouldTrack) return;

  //target {age:10}  key : age   ==> 10
  //set
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    targetMap.set(target, depsMap);
    // Map(1) { { age: 10 } => Map(0) {} }
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Set();
    depsMap.set(key, dep);
  }

  dep.add(activeEffect);
  activeEffect.deps.push(dep);
}

export function trigger(target, key) {
  const depsMap = targetMap.get(target);
  const dep = depsMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

export function effect(fn, options: any = {}) {
  const _effect = new ReactiveEffect(fn, options.scheduler);
  extend(_effect, options);
  _effect.run();
  const runner: any = _effect.run.bind(_effect);
  runner._effect = _effect;
  return runner;
}

export function stop(runner) {
  runner._effect.stop();
}
