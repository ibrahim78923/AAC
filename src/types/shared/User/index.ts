import { AddressI } from '../Address';
import { OrganizationI } from '../Organization';

export interface UserI {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  postCode: string;
  address: AddressI;
  cognitoId: string;
  role: string;
  liveStatus: string;
  status: string;
  products: any[];
  organization: OrganizationI;
  createdBy: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
  departmentId: string | null;
  permissionsRole: string | null;
  createdAt: string;
  updatedAt: string;
  igStatus: string;
}
