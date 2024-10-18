export interface IActivityStatusMenuProps {
  apiQuery?: [any, any] | any;
  info: any;
  successMessage?: string;
  activityStatus: string;
  menuItemDataArray: { value: string; label: string }[];
  patchParameterProps?: any;
  refetchApi?: any;
}
