import { PulicInstancePrioxHandlers } from "./componentPulicInstance";
import { intiProps } from "./componentProps";
import { shallowReadonly } from "src/reactivity/reactive";
import { emit } from "./componentEmit";
import { initSlots } from "./componentSlots";

export function createCompenentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    emit: () => {},
    slots: {},
  };
  component.emit = emit.bind(null, component) as any;

  return component;
}

export function setupComponent(instance) {
  //TODO
  intiProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const component = instance.type;

  //ctx
  instance.proxy = new Proxy({ _: instance }, PulicInstancePrioxHandlers);

  const { setup } = component;
  if (setup) {
    //function object
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });
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
