export interface AddPlanFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  methods: any;
  AdditionalStorageValue: any;
  AdditionalUsereValue: any;
  crmValue: any;
  setCrmValue: (value: any) => void;
  selectProductSuite: string;
  setSelectProductSuite: (value: string) => void;
  isSuccess: boolean;
  editPlan: any;
  isFreePlan: boolean;
}

export interface FeaturesModalProps {
  openFeaturesModal: boolean;
  handleCloseFeaturesModal: () => void;
  featureName: string;
  featureId: string;
}

interface SubModule {
  name: string;
  permissions: { name: string; productId: string; slug: string }[];
}

export interface SubModulesAccordionProps {
  subModules?: SubModule[];
  methods?: any;
  handleSubmit?: () => void;
  selectedSubModule?: string;
  handleChangeSubModule?: any;
}
