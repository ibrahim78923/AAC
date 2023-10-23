import { useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import ChooseQuotes from './ChooseQuotes';
import EditDetails from './EditDetails';
import ReviewInvoice from './ReviewInvoice';

const useCreateInvoices = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const invoicesStepperData = [
    {
      key: uuidv4(),
      label: 'Choose Quotes',
      component: <ChooseQuotes />,
    },
    {
      key: uuidv4(),
      label: 'Edit Details',
      component: <EditDetails />,
    },
    {
      key: uuidv4(),
      label: 'Review',
      component: <ReviewInvoice />,
    },
  ];

  const handleCompleteStep = () => {
    if (activeStep == invoicesStepperData?.length - 1) {
      router.push('/super-admin/plan-management');
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const hanldeGoPreviousBack = () => {
    if (activeStep === 0) {
      router.push('/super-admin/plan-management');
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return {
    activeStep,
    invoicesStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
  };
};

export default useCreateInvoices;
