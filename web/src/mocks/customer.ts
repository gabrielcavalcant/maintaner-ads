import { Customer } from "@/types/data/customer";
import { faker } from "@faker-js/faker";

// Mock para a entidade CUSTOMER
export const mockCustomer: Customer = {
  id: faker.number.int(),
  name: faker.company.name(),
  location: faker.address.city(),
  responsible_id: faker.number.int(),
};
