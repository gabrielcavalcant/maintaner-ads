export type Machine = {
  id: number;
  name: string;
  type: string;
  model: string;
  manufacture_date: Date;
  serial_number: string;
  environment_id: number; // FK para ENVIRONMENT
};
