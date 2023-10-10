import { useState } from 'react';

import { useRouter } from 'next/router';

import AddPlanForm from './Forms/AddPlanForm/ASDasd';
import PlanFeaturesForm from './Forms/PlanFeatures';
import ModulesForm from './Forms/ModulesForm';

import { v4 as uuidv4 } from 'uuid';

export const UseAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});

  const router = useRouter();

  const hanldeGoBack = () => {
    router.back();
  };

  const AddPlanStepperData = [
    {
      key: uuidv4(),
      label: 'Plan Form',
      component: <AddPlanForm />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Plan Features',
      component: <PlanFeaturesForm />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
    {
      key: uuidv4(),
      label: 'Modules',
      component: <ModulesForm />,
      componentProps: { addPlanFormValues, setAddPlanFormValues },
    },
  ];

  return {
    addPlanFormValues,
    setAddPlanFormValues,
    AddPlanStepperData,
    hanldeGoBack,
  };
};
