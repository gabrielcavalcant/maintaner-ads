import { Environment } from "@/types/data/environment";
import { faker } from "@faker-js/faker";

// Mock para a entidade ENVIRONMENT
export const mockEnvironment: Environment = {
  id: faker.number.int(),
  name: faker.company.name(),
  location: faker.address.city(),
  responsible_id: faker.number.int(),
};
