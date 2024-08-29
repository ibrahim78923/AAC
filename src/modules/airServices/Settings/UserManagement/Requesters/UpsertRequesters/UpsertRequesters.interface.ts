export interface UpsertRequestersResponseI {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  cognitoId: string;
  role: string;
  liveStatus: string;
  status: string;
  products: string[];
  companyId: string;
  createdBy: string;
  deletedBy: string | null;
  isDeleted: boolean;
  departmentId: string | null;
  permissionsRole: string | null;
  createdAt: string;
  updatedAt: string;
}
