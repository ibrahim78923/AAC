export interface ManageDashboardFilterFormDefaultValuesDynamicI {
  dashboard: { _id: string; name: string; [key: string]: any } | null;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    [key: string]: any;
  } | null;
  accessRights: string | null;
}
