export type AuthToken = {
  access_token: string;
  refresh_token: string;
  statusCode?: number;
  permission?: string[];
};

export type User = {
  sub: string;
  email: string;
  fullName: string;
  iat: number;
  exp: number;
  permission: string[];
};
