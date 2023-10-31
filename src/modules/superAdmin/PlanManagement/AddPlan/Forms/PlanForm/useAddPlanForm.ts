import { useRouter } from 'next/router';

import { dataArray } from './PlanForm.data';

export const useAddPlanForm = () => {
  const router = useRouter();

  const formDefaultValuesFunction = dataArray(router?.query?.action === 'view');

  return {
    formDefaultValuesFunction,
  };
};
