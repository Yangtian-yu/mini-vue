import { camelize, toHandlekey } from "src/shared";

export function emit(instance, event, ...args) {
  console.log(event);
  const { props } = instance;

  //TPP
  //先去写一个特定的行为 =》 重构成通用的行为
  //add-> Add
  //add-foo -> addFoo

  const str = camelize(event);
  const handlerName = toHandlekey(str);
  const handler = props[handlerName];
  handler && handler(...args);
}
