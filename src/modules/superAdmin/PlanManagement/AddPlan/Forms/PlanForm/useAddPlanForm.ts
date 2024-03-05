import { useRouter } from 'next/router';
import { dataArray } from './PlanForm.data';
import { useState } from 'react';

export const useAddPlanForm = (AdditionalStorageValue: any) => {
  const router = useRouter();
  const [selectProductSuite, setSelectProductSuite] = useState('product');
  const formDefaultValuesFunction = dataArray(
    router?.query?.action === 'view',
    selectProductSuite,
    AdditionalStorageValue,
  );

  return {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
  };
};
