import { useRouter } from 'next/router';
import { dataArray } from './PlanForm.data';
import { useState } from 'react';
export const useAddPlanForm = () => {
  const router = useRouter();
  const [selectProductSuite, setSelectProductSuite] = useState('product');

  const formDefaultValuesFunction = dataArray(router?.query?.action === 'view');

  return {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
  };
};
