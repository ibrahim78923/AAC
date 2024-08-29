export interface SoftwareUserDataI {
  _id: string;
  createdAt: string;
  updatedAt: string;
  Name: string;
  Source: string;
  Contract?: string;
  contractId?: string;
}
export interface AllocateSubmitI {
  contract: {
    _id: string;
    name: string;
    cost: number;
    status: string;
  };
}
