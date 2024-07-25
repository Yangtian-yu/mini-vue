import { hasOwn } from "src/shared";

const publicPropertieMap = {
  $el: (i) => i.vnode.el,
  //$solt
  $slots: (i) => i.slots,
};

export const PulicInstancePrioxHandlers = {
  get({ _: instance }, key) {
    // setupStats
    const { setupState, props } = instance;

    if (hasOwn(setupState, key)) {
      return setupState[key];
    } else if (hasOwn(props, key)) {
      return props[key];
    }

    if (key in publicPropertieMap) {
      return publicPropertieMap[key](instance);
    }
  },
};
