export interface SingleStepI {
  key: string;
  label: string;
  component: React.ReactNode;
}
export interface HorizontalStepperI {
  stepsArray: SingleStepI[];
  addPlanFormValues?: any;
  setAddPlanFormValues?: React.Dispatch<React.SetStateAction<any>>;
  disableNextButton?: boolean;
  variantNextButton?: 'text' | 'contained' | 'outlined';
  nextButtonText?: string;
  nextButtonFinishText?: string;
  stepperPadding?: string;
  stepperMargin?: string;
  cancelButton?: boolean;
  handleCancel?: () => void;
  divider?: boolean;
}
// Test comment: file name samll to capital
