interface ManagedByDetails {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  cognitoId: string;
  role: string;
  liveStatus: string;
  status: string;
  products: string[];
  organization: string;
  companyId: string;
  createdBy: string;
  deletedBy: string | null;
  isDeleted: boolean;
  departmentId: string;
  permissionsRole: string;
  createdAt: string;
  updatedAt: string;
  igStatus: string;
}

interface Details {
  category?: string;
  publisher?: string;
  managedBy?: string;
  description?: string;
}

interface Data {
  _id: string;
  details: Details;
  name: string;
  status: string;
  type: string;
  users: number;
  installs: number;
  publisher: string;
  managedByDetails: ManagedByDetails;
}

export interface UpsertSoftwareI {
  isAddDrawerOpen: boolean;
  data?: Data;
  isLoading?: boolean;
  isFetching?: boolean;
  setIsAddDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface UpsertSoftwareFormI {
  name: string;
  status: string;
  type: string;
  details?: {
    category?: string;
    publisher?: string;
    managedBy?: string;
    description?: string;
  };
  customFields?: { [key: string]: any };
}
