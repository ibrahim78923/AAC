export interface IActivityStatusMenuProps {
  apiQuery?: [any, any];
  info: any;
  successMessage?: string;
  activityStatus: string;
  MenuItemDataArray: { value: string; label: string }[];
  patchParameterProps?: any;
}
