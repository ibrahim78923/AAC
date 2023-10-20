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
  stepperPadding?: string;
  stepperMargin?: string;
  cancelButton?: boolean;
  handleCancel?: () => void;
}
// Test comment: file name samll to capital
