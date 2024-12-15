export type Maintenance = {
  id: number;
  type: string;
  description: string;
  maintenance_date: Date;
  status: number;
  motorcycle_id: number; // FK para Motorcycle
  motorcycle: string;
  team: string;
  team_id: number; // FK para TEAM
  responsible_id: number; // FK para USER
  responsible: string;
  request_id: number; // FK para REQUEST
  accepted_by_id: number;
  accepted_by: string; // FK para USER
};

export type MaintenanceItem = {
  id: number;
  maintenance_id: number; // FK para MAINTENANCE
  item_id: number; // FK para ITEM
  quantity: number;
};
