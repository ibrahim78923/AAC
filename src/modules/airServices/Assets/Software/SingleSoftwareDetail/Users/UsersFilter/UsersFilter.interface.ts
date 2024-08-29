export interface UsersFilterDataI {
  name?: string;
  department?: string;
  assignedDate?: string;
  firstSeen?: string;
  lastSeen?: string;
}
export interface UsersFilterI {
  filterValues: UsersFilterDataI;
  setFilterValues: React.Dispatch<React.SetStateAction<UsersFilterDataI>>;
}
