export interface PermissionTabsArrayI {
  _id: string | number;
  id: string;
  name: string;
  tabPermissions: string[];
  component: any;
  label?: string;
  disabled?: boolean;
  componentProps?: { [key: string]: any };
  hasNoPermissions?: boolean;
}

export interface PermissionTabsPropsI {
  tabsDataArray: PermissionTabsArrayI[];
  variant?: 'fullWidth' | 'scrollable' | 'standard';
  spacing?: number;
  defaultValue?: number;
  disableBoxShadow?: boolean;
  border?: string | number;
  orientation?: 'horizontal' | 'vertical';
  handleTabChange?: any;
}
