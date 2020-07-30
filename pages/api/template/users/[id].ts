import { NextApiRequest, NextApiResponse } from "next";
import faker from "faker";

export const composeUser = (id: Number) => {
  const res = {
    id,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    username: faker.internet.userName(),
    email: faker.internet.email(),
    address: {
      street: faker.address.streetName(),
      suite: faker.address.secondaryAddress(),
      city: faker.address.city(),
      zipcode: faker.address.zipCode(),
      geo: {
        lat: faker.address.latitude(),
        lng: faker.address.longitude(),
      },
    },
    phone: faker.phone.phoneNumber(),
    website: faker.internet.domainName(),
    company: {
      name: faker.company.companyName(),
      catchPhrase: faker.company.catchPhrase(),
      bs: faker.company.bs(),
    },
  };
  return res;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const user = composeUser(Number(req.query.id));
  res.json(user);
};
