export interface DrawerItemOptionI {
  value: string;
  label: string;
}

export interface DrawerItemI {
  md: number;
  component: React.ComponentType<any>;
  componentProps: {
    select?: boolean;
    [key: string]: any;
  };
  options?: DrawerItemOptionI[];
}

export interface DataArrayFunction {
  (): DrawerItemI[];
}
