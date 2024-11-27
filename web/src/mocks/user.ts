import { User } from "@/types/data/user";
import { faker } from "@faker-js/faker";

export const mockUser: User = {
  id: faker.number.int(),
  email: faker.internet.email(),
  fullName: faker.name.fullName(),
  base64: faker.image.dataUri(),
  hash: faker.string.alphanumeric(16),
  hashedRt: faker.string.alphanumeric(32),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  role_id: faker.number.int(),
};
