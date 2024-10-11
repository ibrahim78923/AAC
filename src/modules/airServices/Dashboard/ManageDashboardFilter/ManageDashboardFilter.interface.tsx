interface ComponentProps {
  fullWidth?: boolean;
  name: string;
  label: string;
  placeholder: string;
  apiQuery?: any;
  externalParams?: {
    limit?: number;
    page?: number;
    productId?: string;
  };
  getOptionLabel: (option: { [key: string]: any }) => string | undefined;
  options?: { value?: string; label?: string; [key: string]: any }[];
}

export interface ManageDashboardsFilterFormFieldsDynamicI {
  id: number;
  component: React.ComponentType<any>;
  gridLength: number;
  componentProps: ComponentProps;
}

export interface ManageDashboardFilterFormDefaultValuesDynamicI {
  dashboard: { _id: string; name: string; [key: string]: any } | null;
  owner: {
    _id: string;
    firstName: string;
    lastName: string;
    [key: string]: any;
  } | null;
  accessRights: string | null;
}
