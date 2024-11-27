import { Team, TeamMember } from "@/types/data/team";
import { faker } from "@faker-js/faker";

export const mockTeam: Team = {
  id: faker.number.int(),
  name: faker.company.name(),
};

export const mockTeamMember: TeamMember = {
  id: faker.number.int(),
  specialty: faker.lorem.word(),
  team_id: faker.number.int(),
  user_id: faker.number.int(),
};
