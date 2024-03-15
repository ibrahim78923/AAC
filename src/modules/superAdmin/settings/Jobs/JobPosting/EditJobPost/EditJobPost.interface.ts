export interface EditJobPostPropsI {
  isModalOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  formMethods: any;
  isLoading?: boolean;
  title: string;
  isFieldsDisabled: boolean;
}
