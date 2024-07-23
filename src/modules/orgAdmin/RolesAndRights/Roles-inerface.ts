export interface actionButton {
  checkedRows?: string;
}

interface PermissionsData {
  permissions?: PermissionItem[];
  data?: PermissionItem[];
}

interface PermissionItem {
  name: string;
  subModules: SubModule[];
}

interface SubModule {}

export interface PermissionsAccordionInterface {
  permissionsData: PermissionsData;
  query:
    | {
        id: string;
        type: string;
      }
    | any;
  getModulePermissions: (subModules: SubModule[]) => string[];
  selectAllPermissions: (subModules: SubModule[]) => void;
  watch: (field: string) => string[];
  disabled: boolean;
}

export interface filterValuesI {
  search: string;
  status: string;
  product: { name: string; _id: string };
}
export interface RoleFiltersProps {
  setFilterValues: (values: filterValuesI) => void;
  setIsOpen: (isOpen: boolean) => void;
  filterVal: filterValuesI;
  isOpen: boolean;
}
