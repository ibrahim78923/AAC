export default interface AccordianInterfaceI {
  className?: string;
  handleSwitch?: (() => void) | undefined;
  checked?: boolean;
  data?: {
    title: string;
    hasSwitch?: boolean;
    endIcon?: React.ReactNode;
    content?: React.ReactNode;
    children?: React.ReactNode | string | undefined;
  }[];
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
  getModulePermissions: (subModules: SubModule[]) => string[];
  selectAllPermissions: (subModules: SubModule[]) => void;
  watch: (field: string) => string[];
  disabled: boolean;
  query: any;
}
