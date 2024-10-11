export interface installationDataI {
  _id: string;
  displayName: string;
  version: string;
  userDetail: {
    firstName: string;
    lastName: string;
  };
  departmentDetail: {
    name: string;
  };
  assetLifeExpiry: string;
}
