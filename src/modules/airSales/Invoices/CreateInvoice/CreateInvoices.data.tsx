import ChooseQuotes from './ChooseQuotes';
import EditDetails from './EditDetails';
import ReviewInvoice from './ReviewInvoice';
import useCreateInvoices from './useCreateInvoices';

import { v4 as uuidv4 } from 'uuid';

export const CreateInvoicesStepperData = () => {
  const { hanldeGoBack, setAddPlanFormValues, addPlanFormValues } =
    useCreateInvoices();

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
