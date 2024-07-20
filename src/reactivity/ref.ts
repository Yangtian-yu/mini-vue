import { isTracking, trackEffects, triggerEffects } from "./effect";

class RefIml {
  private _value: any;
  dep: Set<unknown>;

  constructor(value) {
    this._value = value;
    this.dep = new Set();
  }

  get value() {
    if (isTracking()) {
      trackEffects(this.dep);
    }
    return this._value;
  }

  set value(newValue) {
    //一定先去修改了 value 的
    this._value = newValue;
    triggerEffects(this.dep);
  }
}

export const ref = (value) => {
  return new RefIml(value);
};
