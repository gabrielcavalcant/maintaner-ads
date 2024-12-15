export type Motorcycle = {
  id: number;
  name: string;
  type: string;
  plate: string;
  yearManufacture: Date;
  customer_id: number; // FK para CUSTOMER
};
