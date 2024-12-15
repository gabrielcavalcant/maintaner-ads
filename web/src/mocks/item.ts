import { Item } from "@/types/data/item";
import { faker } from "@faker-js/faker";

export const mockItem: Item = {
  id: faker.number.int(),
  name: faker.commerce.productName(),
  serialCode: faker.string.alphanumeric(8),
  supplier: faker.company.name(),
  // base64: faker.image.dataUri(),
  stockQuantity: faker.number.int({ min: 0, max: 500 }),
  description: "faker.number.int({ min: 0, max: 249 })"
};
