const publicPropertieMap = {
    $el: (i) => i.vnode.el,
};
const PulicInstancePrioxHandlers = {
    get({ _: instance }, key) {
        const { setupState } = instance;
        if (key in setupState) {
            return setupState[key];
        }
        if (key in publicPropertieMap) {
            return publicPropertieMap[key](instance);
        }
    },
};

function createCompenentInstance(vnode) {
    const component = {
        vnode,
        type: vnode.type,
        setupState: {},
    };
    return component;
}
function setupComponent(instance) {
    setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
    const component = instance.type;
    instance.proxy = new Proxy({ _: instance }, PulicInstancePrioxHandlers);
    const { setup } = component;
    if (setup) {
        const setupResult = setup();
        handleSetupResult(instance, setupResult);
    }
}
function handleSetupResult(instance, setupResult) {
    if (typeof setupResult === "object") {
        instance.setupState = setupResult;
    }
    finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
    const component = instance.type;
    instance.render = component.render;
}

function render(vnode, container) {
    patch(vnode, container);
}
function patch(vnode, container) {
    console.log(vnode.type);
    const { ShapeFlage } = vnode;
    if (ShapeFlage & 1) {
        processElement(vnode, container);
    }
    else if (ShapeFlage & 2) {
        processComponent(vnode, container);
    }
}
function processElement(vnode, container) {
    mountElement(vnode, container);
}
function mountElement(vnode, container) {
    const { children, props, type, ShapeFlage } = vnode;
    const el = (vnode.el = document.createElement(type));
    if (ShapeFlage & 4) {
        el.textContent = children;
    }
    else if (ShapeFlage & 8) {
        mountChildren(vnode, el);
    }
    for (const key in props) {
        el.setAttribute(key, props[key]);
    }
    container.append(el);
}
function mountChildren(vnode, container) {
    vnode.children.forEach((v) => {
        patch(v, container);
    });
}
function processComponent(vnode, container) {
    moutcomponent(vnode, container);
}
function moutcomponent(initialVNode, container) {
    const instance = createCompenentInstance(initialVNode);
    setupComponent(instance);
    setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
    const { proxy } = instance;
    const subTree = instance.render.call(proxy);
    patch(subTree, container);
    initialVNode.el = subTree.el;
}

function createVNode(type, props, children) {
    const vnode = {
        type,
        props,
        children,
        ShapeFlage: getShapeFlag(type),
        el: null,
    };
    if (typeof children === "string") {
        vnode.ShapeFlage |= 4;
    }
    else if (Array.isArray(children)) {
        vnode.ShapeFlage |= 8;
    }
    return vnode;
}
function getShapeFlag(type) {
    return typeof type === "string"
        ? 1
        : 2;
}

function createApp(rootComponent) {
    return {
        mount(rootContainer) {
            const vnode = createVNode(rootComponent);
            render(vnode, rootContainer);
        },
    };
}

function h(type, props, children) {
    return createVNode(type, props, children);
}

export { createApp, h };
//# sourceMappingURL=mini-vue.esm-bundler.js.map
