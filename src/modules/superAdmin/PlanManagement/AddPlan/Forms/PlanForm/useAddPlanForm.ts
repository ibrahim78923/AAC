import { useRouter } from 'next/router';
import { dataArray } from './PlanForm.data';
import { useState } from 'react';
import { useGetProductsQuery } from '@/services/superAdmin/plan-mangement';

export const useAddPlanForm = (AdditionalStorageValue: any) => {
  const router = useRouter();
  const [selectProductSuite, setSelectProductSuite] = useState('product');
  const { data } = useGetProductsQuery({});
  const formDefaultValuesFunction = dataArray(
    router?.query?.action === 'view',
    AdditionalStorageValue,
  );

  const productsOptions = data?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const planLabelRender =
    selectProductSuite == 'product' ? 'productId' : 'suite';
  const planNameRender = selectProductSuite == 'product' ? 'Product' : 'Suite';

  return {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
    productsOptions,
    planLabelRender,
    planNameRender,
  };
};
