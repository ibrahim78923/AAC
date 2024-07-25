export interface SubModule {
  name: string;
  permissions: Permission[];
}

export interface Permission {
  name: string;
  slug: string;
}

export interface DashboardAccordionProps {
  subModules: SubModule[];
  disabled: boolean;
  selectedSubModule: string;
  handleChangeSubModule: (subModuleName: string) => void;
}
