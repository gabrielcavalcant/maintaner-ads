export type Customer = {
  id: number;
  name: string;
  location: string;
  responsible_id: number; // FK para USER
};
