export function createCompenentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
  };
  return component;
}

export function setupComponent(instance) {
  //TODO
  //intiProps()
  //initSlots()
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const component = instance.type;
  const { setup } = component;
  if (setup) {
    //function object
    const setupResult = setup();
    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance, setupResult: any) {
  //function object
  //TODO function
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance: any) {
  const component = instance.type;

  instance.render = component.render;
}
