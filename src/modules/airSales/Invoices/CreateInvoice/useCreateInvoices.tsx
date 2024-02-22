import { useState } from 'react';
import { useRouter } from 'next/router';
import { AIR_SALES } from '@/routesConstants/paths';
import EditDetails from './EditDetails';
import ReviewInvoice from './ReviewInvoice';
import { v4 as uuidv4 } from 'uuid';

const useCreateInvoices = () => {
  const [activeStep, setActiveStep] = useState(0);
  const router = useRouter();

  const invoicesStepperData = [
    {
      key: uuidv4(),
      label: 'Choose Quotes',
      component: '<ChooseQuotes />',
    },
    {
      key: uuidv4(),
      label: 'Edit Details',
      component: <EditDetails />,
    },
    {
      key: uuidv4(),
      label: 'Review and Send',
      component: <ReviewInvoice />,
    },
  ];

  const handleCompleteStep = () => {
    if (activeStep == invoicesStepperData?.length - 1) {
      router.push(AIR_SALES?.SALES_INVOICES);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const hanldeGoPreviousBack = () => {
    if (activeStep === 0) {
      router.push(AIR_SALES?.SALES_INVOICES);
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlerCancelButton = () => {
    router.push(AIR_SALES?.SALES_INVOICES);
  };

  return {
    AIR_SALES,
    activeStep,
    invoicesStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
    handlerCancelButton,
  };
};

export default useCreateInvoices;
