import { isReadonly, shallowReadonly } from "../reactive";
import { describe, it, expect, vi } from "vitest";

describe("shalldowReadonly", () => {
  it("should not make non-ractive properties ractive", () => {
    const props = shallowReadonly({ n: { foo: 1 } });
    expect(isReadonly(props)).toBe(true);
    expect(isReadonly(props.n)).toBe(false);
  });
  it("warn when call set", () => {
    console.warn = vi.fn();
    const user = shallowReadonly({
      age: 10,
    });
    user.age = 11;
    expect(console.warn).toHaveBeenCalled();
  });
});
