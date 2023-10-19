import React from 'react';
import AppHorizontalStepper from '@/components/Stepper';
import { stepperData } from './Stepper.data';

const Stepper = () => {
  return <AppHorizontalStepper stepsArray={stepperData} />;
};

export default Stepper;
