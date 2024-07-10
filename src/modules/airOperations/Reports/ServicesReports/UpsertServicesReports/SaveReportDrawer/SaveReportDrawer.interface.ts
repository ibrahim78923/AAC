export interface usersDropdownOptionsI {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  _id: string;
}

export interface SaveReportDrawerPropsI {
  reportName: string;
  sharedWith: string;
  addToDashboard: string;
  addToExistingCondition: string;
  everyoneCondition: string;
  specificUsersConditionOne: [];
  specificUsersConditionTwo: string;
  addToNewConditionOne: string;
  addToNewConditionTwo: string;
  newDashboardEveryoneCondition: string;
  newDashboardSpecificUsersConditionOne: [];
  newDashboardSpecificUsersConditionTwo: string;
  addFilter: boolean;
}
