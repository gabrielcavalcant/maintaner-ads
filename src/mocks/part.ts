import { Part } from "@/types/data/part";
import { faker } from "@faker-js/faker";

export const mockPart: Part = {
  id: faker.number.int(),
  name: faker.commerce.productName(),
  code: faker.string.alphanumeric(8),
  supplier: faker.company.name(),
  base64: faker.image.dataUri(),
  stock_quantity: faker.number.int({ min: 0, max: 500 }),
  unit_price: parseFloat(faker.commerce.price()),
};
