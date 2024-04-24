import {
  RHFDatePicker,
  RHFSelect,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  useGetOrganizationsQuery,
  useGetPlanTypeQuery,
  useGetProductsQuery,
} from '@/services/superAdmin/billing-invoices';

import * as Yup from 'yup';

export const validationSchema = Yup?.object()?.shape({
  clientName: Yup?.string()?.trim()?.required('Field is Required'),
  product: Yup?.string()?.trim()?.required('Field is Required'),
  planType: Yup?.string()?.trim()?.required('Field is Required'),
  additionalUser: Yup?.string()?.trim(),
  planPrice: Yup?.string()?.trim(),
  defaultUser: Yup?.string()?.trim(),
  defaultUserTwo: Yup?.string()?.trim(),
  additionalStorage: Yup?.string(),
  discount: Yup?.string()?.trim(),
  billingCycle: Yup?.string()?.trim()?.required('Field is Required'),
  date: Yup?.date(),
});

export const defaultValues = {
  clientName: '',
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

  const productSuite = productData?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { data: planTypeData } = useGetPlanTypeQuery<any>({
    refetchOnMountOrArgChange: true,
  });

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  const { data: OrganizationsData } = useGetOrganizationsQuery<any>({
    refetchOnMountOrArgChange: true,
  });

  const Organizations = OrganizationsData?.data?.map((Organizations: any) => ({
    value: Organizations?._id,
    label: Organizations?.name,
  }));

  const options = selectProductSuite === 'product' ? productSuite : crmOptions;

  return [
    {
      componentProps: {
        name: 'clientName',
        label: 'Client Name & Organization',
        fullWidth: true,
        select: true,
        disabled: isEditModal,
      },

      options: Organizations,

      component: RHFSelect,

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
        disabled: isEditModal,
      },

      options: planType,

      component: RHFSelect,

      md: 12,
    },

    {
      componentProps: {
        name: 'planPrice',
        label: 'Plan Price',
        fullWidth: true,
        disabled: true,
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
      },

      component: RHFTextField,

      md: 4,
    },
    {
      componentProps: {
        name: 'defaultStorage',
        label: 'Default storage',
        fullWidth: true,
        disabled: true,
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
      },

      component: RHFDatePicker,

      md: 12,
    },
  ];
};

// export const dataArray =
//  [
//   {
//     componentProps: {
//       name: 'clientName',
//       label: 'Client Name & Organization',
//       fullWidth: true,
//       select: true,
//     },

//     options: [
//       { value: 'andrew', label: 'Andrew Stuart,Acceron' },
//       { value: 'John', label: 'John Doe,Orcalo' },
//       { value: 'Olivia', label: 'Mall of wah' },
//       { value: 'John', label: 'John ,Signup' },
//     ],

//     component: RHFSelect,

//     md: 12,
//   },

//   {
//     componentProps: {
//       name: 'product',
//       label: 'Product/Suite',
//       fullWidth: true,
//       select: true,
//     },

//     options: [
//       { value: 'airSales', label: 'Air Sales' },
//       { value: 'airMarketer', label: 'Air Marketer' },
//       { value: 'airOperations', label: 'Air Operations' },
//       { value: 'airServices', label: 'Air Services' },
//       { value: 'loyaltyProgram', label: 'Loyalty Program' },
//     ],

//     component: RHFSelect,

//     md: 12,
//   },

//   {
//     componentProps: {
//       name: 'planType',
//       label: 'Plan Type',
//       fullWidth: true,
//       select: true,
//     },

//     options: [
//       { value: 'Growth', label: 'Growth' },
//       { value: 'Enterprise', label: 'Enterprise' },
//       { value: 'Premiun', label: 'Premiun' },
//     ],

//     component: RHFSelect,

//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'additionalUser',
//       label: 'Additional User',
//       fullWidth: true,
//     },

//     component: RHFTextField,

//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'planPrice',
//       label: 'Plan Price',
//       fullWidth: true,
//     },

//     component: RHFTextField,

//     md: 4,
//   },
//   {
//     componentProps: {
//       name: 'defaultUser',
//       label: 'Default User',
//       fullWidth: true,
//     },

//     component: RHFTextField,

//     md: 4,
//   },
//   {
//     componentProps: {
//       name: 'defaultUser',
//       label: 'Default User',
//       fullWidth: true,
//     },

//     component: RHFTextField,

//     md: 4,
//   },
//   {
//     componentProps: {
//       name: 'additionalStorage',
//       label: 'Additional Storage',
//       fullWidth: true,
//     },

//     component: RHFTextField,

//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'discount',
//       label: 'Discount(%)',
//       fullWidth: true,
//     },

//     component: RHFTextField,

//     md: 12,
//   },
//   {
//     componentProps: {
//       name: 'billingCycle',
//       label: 'Billing Cycle',
//       fullWidth: true,
//       select: true,
//     },

//     options: [
//       { value: 'paidMonthly', label: 'Paid Monthly' },
//       { value: 'paidquarterly', label: 'Paid Quarterly' },
//       { value: 'paidHalfYearly', label: 'Paid Half-Yearly' },
//       { value: 'paidAnnually', label: 'Paid Annually' },
//     ],

//     component: RHFSelect,

//     md: 12,
//   },

//   {
//     componentProps: {
//       name: 'date',
//       label: 'Planned Start Date',
//       fullWidth: true,
//     },

//     component: RHFDatePicker,

//     md: 12,
//   },
// ];
