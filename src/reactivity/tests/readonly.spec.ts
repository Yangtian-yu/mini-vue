import { isReadonly, readonly } from "../reactive";
import { describe, expect, it, vi } from "vitest";

describe("readonly", () => {
  it("happy path", () => {
    const orginal = { foo: 1, bar: { baz: 2 } };
    const warpped = readonly(orginal);
    expect(warpped).not.toBe(orginal);
    expect(isReadonly(warpped)).toBe(true);
    expect(isReadonly(orginal)).toBe(false);
    expect(warpped.foo).toBe(1);
  });

  it("warn when call set", () => {
    console.warn = vi.fn();
    const user = readonly({
      age: 10,
    });
    user.age = 11;
    expect(console.warn).toHaveBeenCalled();
  });
});
