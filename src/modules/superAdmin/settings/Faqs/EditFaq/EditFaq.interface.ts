export interface EditFaqPropsI {
  title: string;
  isModalOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  formMethods: any;
  isLoading?: boolean;
  faqId?: any;
}
