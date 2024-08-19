import { RHFAutocompleteAsync } from '@/components/ReactHookForm';
import useProperties from './useProperties';
import { getSession } from '@/utils';

export const propertiesProductData = (products: any) => {
  return products?.map((item: any) => ({
    id: item?._id,
    name: item?.name,
    icon: item?.logo?.url,
  }));
};

export const propertiesFields = (activeProduct: any) => {
  const { user }: any = getSession();
  const { companyAccounts }: any = useProperties();
  return [
    {
      componentProps: {
        label: 'Select Company Account',
        name: 'comoanyAccount',
        placeholder: 'Select Company Account',
        fullWidth: true,
        required: true,
        disabled: activeProduct === null ? true : false,
        apiQuery: companyAccounts,
        getOptionLabel: (option: any) => option?.accountName,
        externalParams: {
          orgId: user?.organization?._id,
          productId: activeProduct,
        },
        queryKey: 'orgId',
      },
      component: RHFAutocompleteAsync,
      md: 12,
    },
    // {
    //   componentProps: {
    //     label: 'Select module',
    //     name: 'module',
    //     placeholder: 'Select module',
    //     disabled: activeProduct === null ? true : false,
    //     fullWidth: true,
    //     required: true,
    //     apiQuery: modulesList,
    //     getOptionLabel: (option: any) => option?.name,
    //     externalParams: { productId: activeProduct },
    //     queryKey: 'productId',
    //   },
    //   component: RHFAutocompleteAsync,
    //   md: 6,
    // },
  ];
};

export const moduleCards = [
  {
    _id: '11',
    icon: 'icon',
    title: 'Services Catelog',
    description:
      'Create and manage fields to capture information about projects',
  },
  {
    _id: '123',
    icon: 'icon',
    title: 'Business Hours',
    description:
      'Create and manage fields to capture information about projects',
  },
  {
    _id: '11234',
    icon: 'icon',
    title: 'Closure Rule',
    description:
      'Create and manage fields to capture information about projects',
  },
  {
    _id: '123345',
    icon: 'icon',
    title: 'Field Manager',
    description:
      'Create and manage fields to capture information about projects',
  },
  {
    _id: '1123412',
    icon: 'icon',
    title: 'SLA and OLA Policies',
    description:
      'Define service agreements with internal and external stakeholders',
  },
];
