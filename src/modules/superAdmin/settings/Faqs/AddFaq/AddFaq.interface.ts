export interface AddFaqPropsI {
  title: string;
  isAddModalOpen: boolean;
  onClose: () => void;
  handleSubmit: any;
  formMethods: any;
  isLoading?: boolean;
  faqID?: string;
}
