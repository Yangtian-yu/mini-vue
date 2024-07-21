import { hasChange, isObject } from "../shared/index";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefIml {
  private _value: any;
  dep: Set<unknown>;
  private _rawValue: any;
  private __v_isREf: boolean;

  constructor(value) {
    this.__v_isREf = true;
    this._rawValue = value;
    this._value = convert(value);
    this.dep = new Set();
  }

  get value() {
    trackRefValue(this);
    return this._value;
  }

  set value(newValue) {
    //对比的时候 object
    //hasChange
    if (hasChange(this._rawValue, newValue)) {
      this._rawValue = newValue;
      //一定先去修改了 value 的
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

function trackRefValue(ref) {
  if (isTracking()) {
    trackEffects(ref.dep);
  }
}

export const ref = (value) => {
  return new RefIml(value);
};

export const isRef = (ref) => {
  return !!ref.__v_isREf;
};

export const unRef = (ref) => {
  return isRef(ref) ? ref.value : ref;
};

export const proxyRefs = (objectWithRef) => {
  return new Proxy(objectWithRef, {
    get(target, key) {
      //get -> age(ref) 那么就给他返回 .value
      // not ref =》 value
      return unRef(Reflect.get(target, key));
    },
    set(target, key, value) {
      if (isRef(target[key]) && !isRef(value)) {
        return (target[key].value = value);
      } else {
        return Reflect.set(target, key, value);
      }
    },
  });
};
