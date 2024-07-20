import { describe, expect, it } from "vitest";
import { isProxy, isReactive, reactive } from "../reactive";

describe("reactive", () => {
  it("happy path", () => {
    const orginal = { foo: 1 };
    const observed = reactive(orginal);
    expect(observed).not.toBe(orginal);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(orginal)).toBe(false);
    expect(isProxy(observed)).toBe(true);
  });
  it("nested reactive", () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 1 }],
    };
    const observed = reactive(original);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});
