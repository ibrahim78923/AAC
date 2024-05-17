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
  const { companyAccounts, modulesList }: any = useProperties();
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
      md: 6,
    },
    {
      componentProps: {
        label: 'Select module',
        name: 'module',
        placeholder: 'Select module',
        disabled: activeProduct === null ? true : false,
        fullWidth: true,
        required: true,
        apiQuery: modulesList,
        getOptionLabel: (option: any) => option?.name,
        externalParams: { productId: activeProduct },
        queryKey: 'productId',
      },
      component: RHFAutocompleteAsync,
      md: 6,
    },
  ];
};
