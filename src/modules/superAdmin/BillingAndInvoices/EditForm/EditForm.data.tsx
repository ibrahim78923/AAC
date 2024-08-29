import {
  RHFAutocompleteAsync,
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  useGetPlanTypeQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/billing-invoices';

import * as Yup from 'yup';
import { PlanType, Product } from './editForm.interface';
import { useLazyGetOrganizationsListQuery } from '@/services/common-APIs';

export const validationSchema = Yup?.object()?.shape({
  clientName: Yup?.mixed()?.required('Field is Required'),
  product: Yup?.string()?.trim()?.required('Field is Required'),
  planType: Yup?.string()?.trim()?.required('Field is Required'),
  additionalUser: Yup?.string()?.trim(),
  planPrice: Yup?.string()?.trim(),
  defaultUser: Yup?.string()?.trim(),
  defaultUserTwo: Yup?.string()?.trim(),
  additionalStorage: Yup?.string()?.trim(),
  discount: Yup?.string()?.trim(),
  billingCycle: Yup?.string()?.trim()?.required('Field is Required'),
  date: Yup?.date(),
});

export const defaultValues = {
  clientName: null,
  product: '',
  planType: '',
  additionalUser: '',
  planPrice: '',
  defaultUser: '',
  defaultUserTwo: '',
  additionalStorage: '',
  discount: '',
  billingCycle: '',
  date: null,
};

interface CRMOption {
  value: string;
  label: string;
}

export const assignPlanData = (
  selectProductSuite: string,
  crmOptions: CRMOption[],
  isEditModal: boolean,
  isStoragePrice: boolean,
  isUserPrice: boolean,
) => {
  const { data: productData } = useGetProductsQuery<any>({
    refetchOnMountOrArgChange: true,
  });

  const productSuite = productData?.data?.map((product: Product) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { data: planTypeData } = useGetPlanTypeQuery<any>({
    refetchOnMountOrArgChange: true,
  });

  const planType = planTypeData?.data?.map((planType: PlanType) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  const options = selectProductSuite === 'product' ? productSuite : crmOptions;
  const organizations = useLazyGetOrganizationsListQuery();

  return [
    {
      componentProps: {
        name: 'clientName',
        label: 'Client & Organization',
        fullWidth: true,
        placeholder: 'Select organization',
        apiQuery: organizations,
        getOptionLabel: (option: any) => option?.name,
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    {
      componentProps: {
        name: 'product',
        label: `${
          selectProductSuite === 'product' ? 'Select Products' : 'CRM Suite'
        }`,
        fullWidth: true,
        select: true,
        disabled: isEditModal,
        required: true,
      },

      options: options,

      component: RHFSelect,

      md: 12,
    },

    {
      componentProps: {
        name: 'planType',
        label: 'Plan Type',
        fullWidth: true,
        select: true,
        required: true,
      },

      options: planType,

      component: RHFSelect,

      md: 12,
    },

    {
      componentProps: {
        name: 'planPrice',
        label: 'Plan Price (£)',
        fullWidth: true,
        disabled: true,
        placeholder: '£',
      },

      component: RHFTextField,

      md: 4,
    },
    {
      componentProps: {
        name: 'defaultUser',
        label: 'Default User',
        fullWidth: true,
        disabled: true,
        placeholder: 'default user',
      },

      component: RHFTextField,

      md: 4,
    },
    {
      componentProps: {
        name: 'defaultStorage',
        label: 'Def storage (GB)',
        fullWidth: true,
        disabled: true,
        placeholder: 'GB',
      },

      component: RHFTextField,

      md: 4,
    },
    {
      componentProps: {
        name: 'additionalUser',
        label: 'Additional User',
        fullWidth: true,
        disabled: isUserPrice,
        placeholder: 'additional user',
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'additionalStorage',
        label: 'Additional Storage',
        fullWidth: true,
        disabled: isStoragePrice,
        placeholder: 'GB',
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'discount',
        label: 'Discount(%)',
        fullWidth: true,
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'billingCycle',
        label: 'Billing Cycle',
        fullWidth: true,
        select: true,
        required: true,
      },

      options: [
        { value: 'MONTHLY', label: 'Paid Monthly' },
        { value: 'QUARTERLY', label: 'Paid Quarterly' },
        { value: 'HALF_YEARLY', label: 'Paid Half-Yearly' },
        { value: 'YEARLY', label: 'Paid Annually' },
      ],

      component: RHFSelect,

      md: 12,
    },

    {
      componentProps: {
        name: 'date',
        label: 'Billing Date',
        fullWidth: true,
        required: true,
      },

      component: RHFDatePicker,

      md: 12,
    },
  ];
};
