import { useRouter } from 'next/router';
import { dataArray } from './PlanForm.data';
import { useState } from 'react';
// import {

//   useGetProductsQuery,
// } from '@/services/superAdmin/plan-mangement';
export const useAddPlanForm = () => {
  const router = useRouter();
  const [selectProductSuite, setSelectProductSuite] = useState('product');

  const formDefaultValuesFunction = dataArray(router?.query?.action === 'view');
  // const { data } = useGetProductsQuery({});
  return {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
    // data
  };
};
