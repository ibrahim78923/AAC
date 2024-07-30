interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  postCode: string;
  address: {
    composite: string;
  };
  cognitoId: string;
  role: string;
  liveStatus: string;
  status: string;
  products: string[];
  organization: string;
  createdBy: string | null;
  deletedBy: string | null;
  isDeleted: boolean;
  departmentId: string | null;
  permissionsRole: string | null;
  createdAt: string;
  updatedAt: string;
  igStatus: string;
  avatar: {
    id: string;
    url: string;
    size: number;
    mimetype: string;
  };
}

interface Condition {
  fieldName: string;
  condition: string;
  fieldValue: string;
  fieldType: string;
  collectionName: string;
  _id: string;
}

interface Group {
  name: string;
  conditionType: string;
  conditions: Condition[];
  _id: string;
}

interface Action {
  fieldName: string;
  fieldValue: string;
  fieldType: string;
  collectionName: string;
  _id: string;
}

interface Schedule {
  type: string;
  daily?: {
    time: string;
  };
  weekly?: {
    days: string[];
    time: string;
  };
  monthly?: {
    day: number;
    time: string;
  };
  annually?: {
    month: string;
    time: string;
  };
  custom?: {
    startDate: string;
    endDate: string;
    time: string;
  };
}

interface FilterQueryMatch {
  $match: {
    $or: Array<{
      updatedBy: {
        $nin: string[];
      };
    }>;
  };
}

interface Activity {
  type: string;
  userId: string;
  user: User;
}

interface CreatedBy extends User {}

export interface SalesWorkflowI {
  _id: string;
  title: string;
  module?: string;
  description?: string;
  type?: string;
  runType?: string;
  schedule?: Schedule;
  events?: string[];
  groups?: Group[];
  actions?: Action[];
  filterQuery?: FilterQueryMatch[];
  actionValues?: {
    [key: string]: string;
  };
  status?: string;
  groupCondition?: string;
  activity?: Activity;
  createdBy?: CreatedBy;
  companyId?: string;
  createdAt?: string;
  updatedAt?: string;
}
