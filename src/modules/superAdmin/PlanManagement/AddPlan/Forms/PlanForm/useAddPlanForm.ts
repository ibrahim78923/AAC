import { useRouter } from 'next/router';
import { dataArray } from './PlanForm.data';
import {
  useGetCrmQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/plan-mangement';
import { DRAWER_TITLE } from '@/constants';
import { IMPORT_ACTION_TYPE } from '@/constants/strings';
import { ProductOption } from './planForm.interface';

export const useAddPlanForm = (
  AdditionalStorageValue: number,
  AdditionalUsereValue: number,
  selectProductSuite: string,
  setSelectProductSuite: any,
  isSuccess: boolean,
  isFreePlan: boolean,
) => {
  const router = useRouter();
  const { data } = useGetProductsQuery({});
  const { data: getCRM } = useGetCrmQuery({});

  const formDefaultValuesFunction = dataArray(
    router?.query?.action === DRAWER_TITLE?.VIEW,
    AdditionalStorageValue,
    AdditionalUsereValue,
    isSuccess,
    isFreePlan,
  );

  const productsOptions = data?.data?.map((product: ProductOption) => ({
    value: product?._id,
    label: product?.name,
  }));

  const planLabelRender =
    selectProductSuite == IMPORT_ACTION_TYPE?.PRODUCT ? 'productId' : 'suite';
  const planNameRender =
    selectProductSuite == IMPORT_ACTION_TYPE?.PRODUCT ? 'Product' : 'Suite';

  const crmOptions = getCRM?.data?.map((product: ProductOption) => ({
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
