import { Maintenance, MaintenanceItem } from "@/types/data/maintenance";
import { faker } from "@faker-js/faker";

export const mockMaintenance: Maintenance = {
  id: faker.number.int(),
  type: faker.lorem.words(2),
  description: faker.lorem.sentence(),
  maintenance_date: new Date(faker.date.recent()),
  status: faker.number.int({ min: 0, max: 1 }),
  motorcycle_id: faker.number.int({ min: 0, max: 50 }),
  team_id: faker.number.int({ min: 0, max: 50 }),
  responsible_id: faker.number.int({ min: 0, max: 50 }),
  motorcycle: faker.lorem.words(2),
  team: faker.lorem.word(),
  request_id: faker.number.int(),
  responsible: faker.person.firstName(),
  accepted_by_id: faker.number.int(),
  accepted_by: faker.person.firstName(),
};

export const mockMaintenanceItem: MaintenanceItem = {
  id: faker.number.int(),
  maintenance_id: faker.number.int(),
  item_id: faker.number.int(),
  quantity: faker.number.int({ min: 1, max: 100 }),
};
