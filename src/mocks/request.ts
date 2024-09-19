import { Request } from "@/types/data/request";
import { faker } from "@faker-js/faker";

export const mockRequest: Request = {
  id: faker.number.int(),
  description: faker.lorem.sentence(),
  request_date: faker.date.past(),
  requester_id: faker.number.int(),
  machine_id: faker.number.int(),
};
