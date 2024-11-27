import { Role, RolePermission } from "@/types/data/role";
import { faker } from "@faker-js/faker";

export const mockRole: Role = {
  id: faker.number.int(),
  name: faker.lorem.word(),
};

export const mockRolePermission: RolePermission = {
  role_id: faker.number.int(),
  permission_id: faker.number.int(),
};
