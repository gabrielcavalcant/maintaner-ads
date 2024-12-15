export type User = {
  id: number;
  email: string;
  fullName: string;
  base64: string;
  hash: string;
  hashedRt: string;
  createdAt: Date;
  updatedAt: Date;
  role_id: number; // FK para ROLE
};
