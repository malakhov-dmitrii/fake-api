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

export function flattenObject(ob) {
  let toReturn = {};
  let flatObject;
  for (let i in ob) {
    // console.log(i + " " + typeof ob[i]);
    if (!ob.hasOwnProperty(i)) {
      continue;
    }
    //Exclude arrays from the final result
    //Check this http://stackoverflow.com/questions/4775722/check-if-object-is-array
    if (ob[i] && Array === ob[i].constructor) {
      continue;
    }
    if (typeof ob[i] === "object") {
      flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }
        //Exclude arrays from the final result
        if (flatObject[x] && Array === flatObject.constructor) {
          continue;
        }
        // @ts-ignore
        toReturn[i + (!!isNaN(x) ? "." + x : "")] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
