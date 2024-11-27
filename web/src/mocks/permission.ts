import { Permission } from "@/types/data/permission";
import { faker } from "@faker-js/faker";

export const mockPermission: Permission = {
  id: faker.number.int(),
  name: faker.lorem.word(),
};
