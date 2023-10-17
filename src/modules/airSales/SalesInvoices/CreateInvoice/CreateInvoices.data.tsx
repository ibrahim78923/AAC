import { useState } from 'react';

import { useRouter } from 'next/router';

import ChooseQuotes from './ChooseQuotes/ChooseQuotes';
import EditDetails from './EditDetails';
import ReviewInvoice from './ReviewInvoice';

import { v4 as uuidv4 } from 'uuid';

export const CreateInvoicesStepperData = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});

  const router = useRouter();

  const hanldeGoBack = () => {
    router.back();
  };

  const invoicesStepperData = [
    {
      key: uuidv4(),
      label: 'Choose Quotes',
      component: <ChooseQuotes />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Edit Details',
      component: <EditDetails />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Review',
      component: <ReviewInvoice />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
  ];

  return {
    addPlanFormValues,
    setAddPlanFormValues,
    invoicesStepperData,
    hanldeGoBack,
  };
};
