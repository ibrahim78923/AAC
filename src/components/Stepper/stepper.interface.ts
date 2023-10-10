export interface SingleStepI {
  key: string;
  label: string;
  component: React.ReactNode;
}
export interface HorizontalStepperI {
  stepsArray: SingleStepI[];
  addPlanFormValues: any;
  setAddPlanFormValues: React.Dispatch<React.SetStateAction<any>>;
  disableNextButton?: boolean;
  stepperPadding?: string;
  stepperMargin?: string;
}
