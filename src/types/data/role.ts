export type Role = {
  id: number;
  name: string;
};

export type RolePermission = {
  role_id: number; // FK para ROLE
  permission_id: number; // FK para PERMISSION
};
