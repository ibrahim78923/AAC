import * as Yup from 'yup';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { useGetPlanTypesQuery } from '@/services/superAdmin/plan-mangement';
import { ProductOption } from './planForm.interface';

export const defaultValues = {
  suite: [],
  productId: [],
  planTypeId: '',
  description: '',
  defaultUsers: '',
  defaultStorage: '',
  planPrice: '',
  allowAdditionalUsers: 'No',
  additionalPerUserPrice: 0,
  allowAdditionalStorage: 'No',
  additionalStoragePrice: 0,
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
    ?.max(30, 'Maximum 50 characters')
    ?.matches(/^[0-9]*$/, 'must be a number'),
  defaultStorage: Yup?.string()
    ?.trim()
    ?.required('Required field')
    ?.min(1, 'Mininum 1 characters')
    ?.max(50, 'Maximum 50 characters')
    ?.matches(/^[0-9]*$/, 'must be a number'),
  planPrice: Yup?.string()
    ?.matches(/^[0-9]*$/, 'must be a number')
    ?.max(12, 'max is 12'),
  allowAdditionalUsers: Yup?.string(),
  additionalPerUserPrice: Yup?.string()?.matches(
    /^[0-9]*$/,
    'must be a number',
  ),
  allowAdditionalStorage: Yup?.string(),
  additionalStoragePrice: Yup?.string()?.matches(
    /^[0-9]*$/,
    'must be a number',
  ),
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

export const dataArray = (
  _: any,
  AdditionalStorageValue: number,
  AdditionalUsereValue: number,
  isSuccess: boolean,
  isFreePlan: boolean,
) => {
  const { data: planTypeData } = useGetPlanTypesQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: ProductOption) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  return [
    {
      componentProps: {
        name: 'planLabelRender',
        label: 'planNameRender',
        placeholder: 'Select',
        required: true,
        options: planType,
      },
      component: 'RHFMultiSearchableSelect',
      md: 6,
    },
    {
      id: 2,
      componentProps: {
        fullWidth: true,
        name: 'planTypeId',
        label: 'Plan Type',
        select: true,
        placeholder: 'Enter Plan Type',
        required: true,
        disabled: isSuccess,
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
        placeholder: 'Enter Description',
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
        placeholder: 'Enter Default Users',
        required: true,
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
        placeholder: 'Enter Default Storage',
        required: true,
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
        placeholder: '£',
        required: isFreePlan ? false : true,
        disabled: isFreePlan,
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
        placeholder: 'Select',
        disabled: isFreePlan,
      },
      component: RHFSelect,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
      md: 6,
    },
    {
      id: 8,
      componentProps: {
        name: 'additionalPerUserPrice',
        label: 'Additional Per User Price',
        fullWidth: true,
        placeholder: '£',
        disabled: AdditionalUsereValue[0] === 'No',
        required: AdditionalUsereValue[0] === 'No' ? false : true,
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
        placeholder: 'Select',
        disabled: isFreePlan,
      },
      component: RHFSelect,
      options: [
        { value: 'Yes', label: 'Yes' },
        { value: 'No', label: 'No' },
      ],
      md: 6,
    },
    {
      id: 10,
      componentProps: {
        name: 'additionalStoragePrice',
        label: 'Additional Storage Price (Per GB)',
        fullWidth: true,
        placeholder: 'Enter Additional Storage Price',
        disabled: AdditionalStorageValue[0] === 'No',
        required: AdditionalStorageValue[0] === 'No' ? false : true,
      },
      component: RHFTextField,
      md: 6,
    },
  ];
};

export const selectProductSuites = {
  crm: 'CRM',
  planTypeId: 'planTypeId',
};
