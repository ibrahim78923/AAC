export interface UsersDropdownOptionsI {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  _id: string;
  name: string;
  permission: string;
  userId: string;
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
export interface SpecificUsersAccessColumnsI {
  label: string;
  _id: string;
}
export interface SpecificUsersAccessFormFieldsDynamicI {
  id: number;
  data: any;
  align?: 'center' | 'inherit' | 'left' | 'right' | 'justify' | undefined;
  [key: string]: any;
}
export interface SpecialUsersFieldsI {
  id: string;
  name?: string;
}
export interface SaveReportDrawerI {
  open: boolean;
  reportId: any;
  form: any;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  metricType: string | never[];
  data: any;
  handleMoveBack: () => void;
}
