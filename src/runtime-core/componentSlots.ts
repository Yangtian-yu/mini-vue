import { ShapeFlages } from "../shared/ShapeFlages";

export function initSlots(instance, children) {
  // slots

  const { vnode } = instance;
  if (vnode.ShapeFlage & ShapeFlages.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots);
  }
}

function normalizeObjectSlots(children: any, slots) {
  for (const key in children) {
    const value = children[key];
    //slot
    slots[key] = (props) => normalizeSlotValue(value(props));
  }
}

function normalizeSlotValue(value) {
  return Array.isArray(value) ? value : [value];
}
