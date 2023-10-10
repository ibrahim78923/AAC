import { useState } from 'react';

import AddPlanForm from './Forms/AddPlanForm/Index';
import PlanFeaturesForm from './Forms/PlanFeatures';
import ModulesForm from './Forms/ModulesForm';

import { v4 as uuidv4 } from 'uuid';

export const UseAddPlan = () => {
  const [addPlanFormValues, setAddPlanFormValues] = useState({});

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

  return { addPlanFormValues, setAddPlanFormValues, AddPlanStepperData };
};
