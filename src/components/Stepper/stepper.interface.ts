export interface SingleStepI {
  key: string;
  label: string;
  component: React.ReactNode;
}
export interface HorizontalStepperI {
  stepsArray: SingleStepI[];
  addPlanFormValues?: any;
  setAddPlanFormValues?: React.Dispatch<React.SetStateAction<any>>;
  activeStep?: number;
  handleBack?: any;
  handleNext?: any;
  handleReset?: any;
  stepperButtons: any;
  disableNextButton?: boolean;
  stepperPadding?: string;
  stepperMargin?: string;
}
