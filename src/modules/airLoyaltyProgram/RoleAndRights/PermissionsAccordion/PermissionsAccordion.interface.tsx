import { UseFormReturn } from 'react-hook-form';

export interface IPermissionSubModule {
  permissions?: Array<IPermissionItem>;
  subModule?: string;
  name?: string;
}

export interface IPermissionItem {
  slug?: string;
  name?: string;
}

export interface IPermissionParentModule {
  subModules?: Array<IPermissionSubModule>;
  name?: string | any;
}

export interface IUsePermissionsAccordionProps {
  reset?:
    | ((
        callback: (prevState: Record<string, any>) => Record<string, any>,
      ) => void)
    | any;
  methods?: UseFormReturn | any;
  disabled?: boolean;
}

export interface IIsSettingPermissionState {
  isLoading?: boolean;
  name?: string;
}
