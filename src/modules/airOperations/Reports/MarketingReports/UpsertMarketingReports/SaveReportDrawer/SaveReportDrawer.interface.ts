export interface usersDropdownOptionsI {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  _id: string;
}

export interface SaveReportI {
  reportName: string;
  sharedWith: string;
  addToDashboard: string;
  addToExistingCondition: [];
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
