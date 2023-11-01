import { useRouter } from 'next/router';

import { dataArray } from './PlanForm.data';
import { useGetProductsQuery } from '@/services/superAdmin/plan-mangement';

export const useAddPlanForm = () => {
  const router = useRouter();
  const { data, isSuccess } = useGetProductsQuery({});

  const formDefaultValuesFunction = dataArray(router?.query?.action === 'view');

  return {
    formDefaultValuesFunction,
    data,
    isSuccess,
  };
};
