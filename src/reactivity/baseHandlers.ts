import { track, trigger } from "./effect";
import { ReactiveFlags } from "./reactive";

const createGetter = (isReadonly = false) => {
  return (target, key) => {
    if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    }
    const res = Reflect.get(target, key);
    if (!isReadonly) {
      // TODO 依赖收集
      track(target, key);
    }
    return res;
  };
};

const createSetter = () => {
  return (target, key, value) => {
    const res = Reflect.set(target, key, value);
    //TODO 触发依赖
    trigger(target, key);
    return res;
  };
};

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

export const mutableHandlers = {
  get,
  set,
};

export const readonlyMutableHandlers = {
  get: readonlyGet,
  set(target, key, value) {
    console.warn(`key:${key}不可被set 因为target 是readonly`);
    return target;
  },
};
