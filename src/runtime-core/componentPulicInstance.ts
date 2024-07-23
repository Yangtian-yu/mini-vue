const publicPropertieMap = {
  $el: (i) => i.vnode.el,
};

export const PulicInstancePrioxHandlers = {
  get({ _: instance }, key) {
    // setupStats
    const { setupState } = instance;
    if (key in setupState) {
      return setupState[key];
    }
    if (key in publicPropertieMap) {
      return publicPropertieMap[key](instance);
    }
  },
};
