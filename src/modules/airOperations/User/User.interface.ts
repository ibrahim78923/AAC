export interface UserTableRowI {
  _id?: string;
  user?: {
    email?: string;
  };
  team?: {
    name?: string;
  };
  role?: {
    name?: string;
  };
  status?: string;
}
