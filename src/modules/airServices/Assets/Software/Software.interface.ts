export interface SoftwareDataI {
  _id: string;
  details: {
    description: string;
    category: string;
    publisher: string;
  };
  name: string;
  status: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  users: number;
  installs: number;
  publisher: string;
  contractValue: number;
}
