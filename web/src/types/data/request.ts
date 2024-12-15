export type Request = {
  id: number;
  description: string;
  request_date: Date;
  requester_id: number; // FK para USER
  motorcycle_id: number; // FK para Motorcycle
};