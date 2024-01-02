import * as Yup from 'yup';
import {
  RHFMultiSearchableSelect,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  useGetPlanTypesQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/plan-mangement';

export const defaultValues = {
  suite: [],
  productId: [],
  planTypeId: [],
  description: '',
  defaultUsers: '',
  defaultStorage: '',
  planPrice: '',
  allowAdditionalUsers: '',
  additionalPerUserPrice: '',
  allowAdditionalStorage: '',
  additionalStoragePrice: '',
};

export const gpDetailsInfoFormSchema: any = Yup?.object()?.shape({
  planTypeId: Yup?.string()?.required('Required field'),
  description: Yup?.string()
    ?.trim()
    ?.required('Required field')
    ?.min(1, 'Mininum 1 characters')
    ?.max(400, 'Maximum 400 characters'),
  defaultUsers: Yup?.string()
    ?.trim()
    ?.required('Required field')

    ?.min(1, 'Mininum 1 characters')
    ?.max(30, 'Maximum 50 characters'),
  defaultStorage: Yup?.string()
    ?.trim()
    ?.required('Required field')
    ?.min(1, 'Mininum 1 characters')
    ?.max(50, 'Maximum 50 characters'),
  planPrice: Yup?.string()
    ?.matches(/^[0-9]*$/, 'must be a number')
    ?.required('Required field')
    ?.min(1, 'Mininum 1 characters')
    ?.max(12, 'max is 12'),
  allowAdditionalUsers: Yup?.string()?.required('Required field'),
  additionalPerUserPrice: Yup?.string()
    ?.matches(/^[0-9]*$/, 'must be a number')
    ?.required('Required field')
    ?.min(1, 'Mininum 1 characters')
    ?.max(12, 'max is 12'),
  allowAdditionalStorage: Yup?.string()?.required('Required field'),
  additionalStoragePrice: Yup?.string()
    ?.matches(/^[0-9]*$/, 'must be a number')
    ?.required('Required field')
    ?.min(1, 'Mininum 1 characters')
    ?.max(12, 'max is 12'),
});

export const defaultValuesFunction = (data: any = defaultValues) => {
  const {
    suite,
    product,
    planTypeId,
    description,
    defaultUsers,
    defaultStorage,
    planPrice,
    allowAdditionalUsers,
    additionalPerUserPrice,
    allowAdditionalStorage,
    additionalStoragePrice,
  } = data;
  return {
    suite,
    product,
    planTypeId,
    description,
    defaultUsers,
    defaultStorage,
    planPrice,
    allowAdditionalUsers,
    additionalPerUserPrice,
    allowAdditionalStorage,
    additionalStoragePrice,
  };
};

export const dataArray = (_: any, selectProductSuite: any) => {
  const { data } = useGetProductsQuery({});

  const productsOptions = data?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { data: planTypeData } = useGetPlanTypesQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  const planLabelRender =
    selectProductSuite == 'product' ? 'productId' : 'suite';
  const planNameRender =
    selectProductSuite == 'product' ? 'productId' : 'suite';

  return [
    {
      componentProps: {
        name: planLabelRender,
        label: planNameRender,
        isCheckBox: selectProductSuite == 'product' ? false : true,
        options: productsOptions,
      },
      component: RHFMultiSearchableSelect,
      md: 6,
    },
    {
      id: 2,
      componentProps: {
        fullWidth: true,
        name: 'planTypeId',
        label: 'Plan Type',
        select: true,
      },
      options: planType,
      component: RHFSelect,
      md: 6,
    },

    {
      id: 3,
      componentProps: {
        name: 'description',
        label: 'Description',
        fullWidth: true,
        multiline: true,
        rows: 4,
      },
      component: RHFTextField,
      gridLength: 6,
      md: 6,
    },
    {
      id: 4,
      componentProps: {
        name: 'defaultUsers',
        label: 'Default Users',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 6,
    },
    {
      id: 5,
      componentProps: {
        name: 'defaultStorage',
        label: 'Default Storage',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 6,
    },
    {
      id: 6,
      componentProps: {
        name: 'planPrice',
        label: 'Plan Price',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 6,
    },
    {
      id: 7,
      componentProps: {
        name: 'allowAdditionalUsers',
        label: 'Allow Additional Users',
        fullWidth: true,
        select: true,
      },
      component: RHFSelect,
      options: [{ value: 'User', label: 'User' }],
      md: 6,
    },
    {
      id: 8,
      componentProps: {
        name: 'additionalPerUserPrice',
        label: 'Additional Per User Price',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 6,
    },
    {
      id: 9,
      componentProps: {
        name: 'allowAdditionalStorage',
        label: 'Allow Additional Storage',
        fullWidth: true,
        select: true,
      },
      component: RHFSelect,
      options: [{ value: 'Storage', label: 'Storage' }],
      md: 6,
    },
    {
      id: 10,
      componentProps: {
        name: 'additionalStoragePrice',
        label: 'Additional Storage Price (Per GB)',
        fullWidth: true,
      },
      component: RHFTextField,
      md: 6,
    },
  ];
};
