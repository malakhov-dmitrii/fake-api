import faker from "faker";
import * as _ from "lodash";

export const set = (obj, path, val) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const lastObj = keys.reduce((obj, key) => (obj[key] = obj[key] || {}), obj);
  lastObj[lastKey] = val;
};

export const fakeSchema = (body: any) => {
  const res = {};
  Object.entries(body).forEach((entry: [string, string]) => {
    const [key, value] = entry;
    set(res, key, faker.fake(value));
  });
  return res;
};

export const composeTodo = (
  arrId: number,
  id?: number,
  userId?: number,
  completed?: boolean,
  title?
) => {
  const res = {
    id: id || arrId,
    userId: userId || faker.random.number(),
    title: title || faker.random.words(_.random(1, 5)),
    completed: completed || faker.random.boolean(),
  };
  return res;
};
