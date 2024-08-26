import { Machine } from "@/types/data/machine";
import { faker } from "@faker-js/faker";

export const mockMachine: Machine = {
  id: faker.number.int(),
  name: faker.commerce.productName(),
  type: faker.commerce.productMaterial(),
  model: faker.vehicle.model(),
  manufacture_date: faker.date.past(),
  serial_number: faker.string.alphanumeric(10),
  environment_id: faker.number.int(),
};
