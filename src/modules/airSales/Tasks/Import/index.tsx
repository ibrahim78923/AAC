import React from 'react';
import { useTask } from '../useTask';
import ImportStepper from '../Stepper';
import CommonDrawer from '@/components/CommonDrawer';

const Import = (props: any) => {
  const { setIsOpen, isOpen } = props;
  const { ImportStepperData, activeStep, handleNextStep } = useTask();
  return (
    <CommonDrawer
      isDrawerOpen={isOpen}
      title="Filters"
      submitHandler={() =>
        activeStep < 2 ? handleNextStep() : alert('imported')
      }
      onClose={() => {
        setIsOpen(false);
      }}
      okText={activeStep < 2 ? 'Next' : 'Import'}
      footer
      isOk={true}
    >
      <ImportStepper activeStep={activeStep} stepsArray={ImportStepperData} />
    </CommonDrawer>
  );
};

export default Import;
