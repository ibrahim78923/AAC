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
  additionalUser: Yup?.string()?.trim()?.required('Field is Required'),
  planPrice: Yup?.string()?.trim(),
  defaultUser: Yup?.string()?.trim(),
  defaultUserTwo: Yup?.string()?.trim(),
  additionalStorage: Yup?.string()?.trim()?.required('Field is Required'),
  discount: Yup?.string()?.trim()?.required('Field is Required'),
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
  date: new Date(),
};

const CRMSuite = [
  { value: 'CRM1', label: 'CRM1' },
  { value: 'CRM2', label: 'CRM2' },
  { value: 'CRM3', label: 'CRM3' },
];
export const assignPlanData = (selectProductSuite: string) => {
  const { data: productData } = useGetProductsQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const productSuite = productData?.data?.map((product: any) => ({
    value: product?._id,
    label: product?.name,
  }));

  const { data: planTypeData } = useGetPlanTypeQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const planType = planTypeData?.data?.map((planType: any) => ({
    value: planType?._id,
    label: planType?.name,
  }));

  const { data: OrganizationsData } = useGetOrganizationsQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const Organizations = OrganizationsData?.data?.map((Organizations: any) => ({
    value: Organizations?._id,
    label: Organizations?.name,
  }));

  const options = selectProductSuite === 'product' ? productSuite : CRMSuite;

  return [
    {
      componentProps: {
        name: 'clientName',
        label: 'Client Name & Organization',
        fullWidth: true,
        select: true,
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
        name: 'defaultUserTwo',
        label: 'Default User',
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
      },

      component: RHFTextField,

      md: 12,
    },
    {
      componentProps: {
        name: 'additionalStorage',
        label: 'Additional Storage',
        fullWidth: true,
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
        { value: 'paidMonthly', label: 'Paid Monthly' },
        { value: 'paidquarterly', label: 'Paid Quarterly' },
        { value: 'paidHalfYearly', label: 'Paid Half-Yearly' },
        { value: 'paidAnnually', label: 'Paid Annually' },
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
