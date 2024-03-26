import { useRouter } from 'next/router';
import { dataArray } from './PlanForm.data';
import {
  useGetCrmQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/plan-mangement';

export const useAddPlanForm = (
  AdditionalStorageValue: any,
  AdditionalUsereValue: any,
  selectProductSuite: any,
  setSelectProductSuite: any,
) => {
  const router = useRouter();
  const { data } = useGetProductsQuery({});
  const { data: getCRM } = useGetCrmQuery({});

  const formDefaultValuesFunction = dataArray(
    router?.query?.action === 'view',
    AdditionalStorageValue,
    AdditionalUsereValue,
  );

  const productsOptions = data?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const planLabelRender =
    selectProductSuite == 'product' ? 'productId' : 'suite';
  const planNameRender = selectProductSuite == 'product' ? 'Product' : 'Suite';

  const crmOptions = getCRM?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  return {
    formDefaultValuesFunction,
    selectProductSuite,
    setSelectProductSuite,
    productsOptions,
    planLabelRender,
    planNameRender,
    crmOptions,
  };
};
