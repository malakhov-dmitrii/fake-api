import faker from "faker";
import * as _ from "lodash";

export const set = (obj: {}, path: string, val: any) => {
  const keys = path.split("|");
  const lastKey = keys.pop();
  const lastObj = keys.reduce(
    (obj: { [x: string]: {} }, key: string | number) =>
      (obj[key] = obj[key] || {}),
    obj
  );
  lastObj[lastKey] = val;
};

export const createArray = (value: Array<any>) => {
  let arrayRes: any[];

  if (value.length === 2 || value.length === 3) {
    const [length, creation] = value;
    if (typeof creation === "string") {
      arrayRes = Array.from({ length }).map(() => faker.fake(creation));
      switch (value[2]) {
        case "string":
          arrayRes = arrayRes.map((i: any) => String(i));
          break;
        case "boolean":
          arrayRes = arrayRes.map((i: any) => Boolean(i));
          break;
        case "number":
          arrayRes = arrayRes.map((i: any) => Number(i));
          break;

        default:
          break;
      }
    }
    if (typeof creation === "object") {
      arrayRes = Array.from({ length });
    }
  } else {
    console.log("ERROR - array length should be === 2 or 3");
  }
  return arrayRes;
};

export const fakeSchema = (body: any) => {
  const res = {};
  Object.entries(body).forEach((entry: [string, string]) => {
    const [key, value] = entry;

    let arrayRes: any[];

    // Create array as result on field if needed
    if (value.constructor === Array) {
      // Length 2 if no type is provided, 3 if is.
      arrayRes = createArray(value);
      // @ts-ignore
    }

    const valueToSet =
      value.constructor === Array ? arrayRes : faker.fake(value);

    set(res, key, valueToSet);
  });
  return res;
};

export const composeTodo = (
  arrId: number,
  id?: number,
  userId?: number,
  completed?: boolean,
  title?: string | string[]
) => {
  const res = {
    id: id || arrId,
    userId: userId || faker.random.number(),
    title: title || faker.random.words(_.random(1, 5)),
    completed: completed || faker.random.boolean(),
  };
  return res;
};

export const composePost = (
  arrId: number,
  id?: number,
  userId?: number,
  title?: string | string[]
) => {
  const res = {
    id: id || arrId,
    userId: userId || faker.random.number(),
    title: title || faker.random.words(_.random(3, 10)),
    body: faker.lorem.paragraph(),
  };
  return res;
};

export function flattenObject(ob: {
  [x: string]: any;
  hasOwnProperty: (arg0: string) => any;
}) {
  let toReturn = {};
  let flatObject: { [x: string]: any; hasOwnProperty?: any };
  for (let i in ob) {
    // Check if object itself is array
    // console.log(ob.constructor === Array);

    // console.log(i + " " + typeof ob[i]);
    if (!ob.hasOwnProperty(i)) {
      continue;
    }
    //Exclude arrays from the final result
    //Check this http://stackoverflow.com/questions/4775722/check-if-object-is-array
    // if (ob[i] && Array === ob[i].constructor) {
    //   continue;
    // }
    if (typeof ob[i] === "object") {
      flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) {
          continue;
        }

        if (ob[i].constructor === Array) {
          // @ts-ignore
          toReturn[i + (!!isNaN(x) ? "|" + x : "")] = ob[i];
        } else {
          // @ts-ignore
          toReturn[i + (!!isNaN(x) ? "|" + x : "")] = flatObject[x];
        }
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}
