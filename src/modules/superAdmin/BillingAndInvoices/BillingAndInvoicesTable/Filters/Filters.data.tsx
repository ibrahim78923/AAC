import { RHFDatePicker, RHFSelect } from '@/components/ReactHookForm';
import { useGetProductsQuery } from '@/services/superAdmin/billing-invoices';

import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  ClientOrganization: Yup.string(),
  productSuite: Yup.string().trim(),
  planType: Yup.string().trim(),
  plannedStartDate: Yup.date(),
});

export const defaultValues = {
  ClientOrganization: '',
  productSuite: '',
  planType: '',
  plannedStartDate: new Date(),
};

export const dataArray = () => {
  const { data: productData } = useGetProductsQuery<any>({
    refetchOnMountOrArgChange: true,
    pagination: `page=1&limit=10`,
  });

  const productSuite = productData?.data.map((product: any) => ({
    value: product._id,
    label: product.name,
  }));

  return [
    {
      componentProps: {
        name: 'ClientOrganization',
        label: 'Client & Organization',
        fullWidth: true,
        select: true,
      },

      options: [
        { value: 'AnglicLtd', label: 'Anglic Ltd' },
        { value: 'Orcalo', label: 'Orcalo' },
        { value: '10Pearls', label: '10 Pearls' },
        { value: 'ExtremeCommerce', label: 'Extreme Commerce' },
      ],

      component: RHFSelect,

      md: 12,
    },
    {
      componentProps: {
        name: 'productSuite',
        label: 'Product/Suite',
        fullWidth: true,
        select: true,
      },

      options: productSuite,

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

      options: [
        { value: 'Growth', label: 'Growth' },
        { value: 'Enterprise', label: 'Enterprise' },
        { value: 'Premiun', label: 'Premiun' },
      ],
      component: RHFSelect,
      md: 12,
    },

    {
      componentProps: {
        name: 'plannedStartDate',
        label: 'Planned Start Date',
        fullWidth: true,
      },

      component: RHFDatePicker,
      md: 12,
    },
  ];
};
