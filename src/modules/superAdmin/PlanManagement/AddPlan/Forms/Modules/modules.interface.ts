export interface SubModule {
  slug: string;
  name: string;
  subModule: any;
}

export interface Module {
  module: string;
  slug: string;
  name: string;
  subModules: SubModule[];
}

export interface ModulesProps {
  methods: any;
  handleSubmit: any;
  selectedPermission: string[];
  selectAllPermissions: (subModules: SubModule[]) => void;
  getModulePermissions: (subModules: SubModule[]) => any[];
  handleExpandAccordionChange: (module: string) => void;
  handleChangeSubModule: (subModule: any) => void;
  selectedModule: string;
  selectedSubModule: string;
  updatePlanLoading: boolean;
  isLoading: { isLoading: boolean };
}
