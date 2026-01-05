export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

export const ROLES = ["Default", "Member", "Admin"];

export type UserResponse = {
  result: User[];
};
export type UserListParams = {
  page?: string;
  limit?: string;
  search?: string;
};
