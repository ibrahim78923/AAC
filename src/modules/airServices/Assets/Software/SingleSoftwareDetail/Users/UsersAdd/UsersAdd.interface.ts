export interface UsersAddFormDataI {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: string;
  };
  contract?: {
    _id: string;
    name: string;
    cost: number;
    status: string;
  };
}
