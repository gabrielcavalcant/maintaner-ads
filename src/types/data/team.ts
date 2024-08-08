export type Team = {
  id: number;
  name: string;
};

export type TeamMember = {
  id: number;
  specialty: string;
  team_id: number; // FK para TEAM
  user_id: number; // FK para USER
};
