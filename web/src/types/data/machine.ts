export type Machine = {
  id: number;
  name: string;
  type: string;
  plate: string;
  yearManufacture: Date;
  environment_id: number; // FK para ENVIRONMENT
};
