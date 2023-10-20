import React from 'react';
import DrawerComp from '../Drawer';
import { UmbrellaIcon } from '@/assets/icons';
import { useTask } from '../useTask';
import ImportStepper from '../Stepper';

const Import = () => {
  const { ImportStepperData, activeStep, handleNextStep } = useTask();
  return (
    <DrawerComp
      title="Import"
      isOk
      okText={activeStep < 2 ? 'Next' : 'Import'}
      btnTitle="Import"
      submitHandler={() =>
        activeStep < 2 ? handleNextStep() : alert('imported')
      }
      btnIcon={<UmbrellaIcon />}
      footer={true}
    >
      <ImportStepper activeStep={activeStep} stepsArray={ImportStepperData} />
    </DrawerComp>
  );
};

export default Import;
