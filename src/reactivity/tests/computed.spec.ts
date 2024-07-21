import { it, expect, describe, vi } from "vitest";
import { reactive } from "../reactive";
import { computed } from "../computed";

describe("computed", () => {
  it("happy path", () => {
    const user = reactive({
      age: 1,
    });
    const age = computed(() => {
      return user.age;
    });
    expect(age.value).toBe(1);
  });

  it("should computed lazzily", () => {
    const value = reactive({
      foo: 1,
    });
    const getter = vi.fn(() => {
      return value.foo;
    });
    const cValue = computed(getter);
    //lazy
    expect(getter).not.toHaveBeenCalled();

    expect(cValue.value).toBe(1);
    expect(getter).toHaveBeenCalledTimes(1);

    // //should not computed again
    cValue.value;
    expect(getter).toHaveBeenCalledTimes(1);

    // // should not compute untill needed
    value.foo = 2;
    expect(getter).toHaveBeenCalledTimes(1);
    // // // //now it shuld compute
    expect(cValue.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(2);
  });
});
