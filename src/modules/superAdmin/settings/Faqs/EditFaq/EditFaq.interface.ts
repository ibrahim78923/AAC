export interface EditFaqPropsI {
  isModalOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  formMethods: any;
  isLoading?: boolean;
  title?: string;
  onViewDisabled: boolean;
}
