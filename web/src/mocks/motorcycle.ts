import { Motorcycle } from "@/types/data/motorcycle";
import { faker } from "@faker-js/faker";

export const mockMotorcycle: Motorcycle = {
  id: faker.number.int(),
  name: faker.commerce.productName(),
  type: faker.commerce.productMaterial(),
  plate: faker.vehicle.model(),
  yearManufacture: faker.date.past(),
  environment_id: faker.number.int(),
};
