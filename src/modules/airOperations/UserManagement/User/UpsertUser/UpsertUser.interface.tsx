export interface UpsertUserFormDefaultValuesI {
  user?: {
    firstName: string;
    lastName: string;
    address: string;
    email?: string;
    phoneNumber: string;
    jobTitle: string;
    facebookUrl: string;
    linkedInUrl: string;
    twitterUrl: string;
    language: string;
  };
  role?: { [key: string]: any };
  team?: { [key: string]: any };
}

export interface UpsertUserFormI {
  firstName: string;
  lastName: string;
  address: string;
  email?: string;
  phoneNumber: string;
  jobTitle: string;
  role: { [key: string]: any };
  team: { [key: string]: any };
  language: { [key: string]: any };
  facebookUrl: string;
  linkedInUrl: string;
  twitterUrl: string;
}

export interface RoleApiQueryParamsI {
  productId: string;
  organizationId: string;
  organizationCompanyAccountId: string;
  limit: number;
}

export interface UserManagementResponseI {
  statusCode: number;
  message: string;
  data: {
    statusCode: number;
    message: string;
    data: {
      _id: string;
      user: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
      };
      role: {
        _id: string;
        name: string;
      };
      team: {
        _id: string;
        name: string;
      };
      status: string;
    } | null;
    error: any;
  } | null;
  error: any;
}
