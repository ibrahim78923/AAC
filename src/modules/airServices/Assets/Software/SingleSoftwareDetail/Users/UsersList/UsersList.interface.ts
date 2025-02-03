export interface UserTableDataI {
  _id: string;
  createdAt: string;
  updatedAt: string;
  Name: string;
  Source: string;
  Contract?: string;
  contractId?: string;
}
export interface UserTableI {
  setUsersData: React.Dispatch<React.SetStateAction<UserTableDataI[]>>;
  usersData: UserTableDataI[];
}
