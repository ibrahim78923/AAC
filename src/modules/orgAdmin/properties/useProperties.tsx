import { useState } from 'react';
import { useLazyGetProductsPermissionsListQuery } from '@/services/airMarketer/settings/roles-and-rights';
import {
  useGetProductsQuery,
  useLazyGetCompanyAccountsListsQuery,
} from '@/services/common-APIs';

const useProperties = () => {
  const [activeProduct, setActiveProduct] = useState(null);

  const { data: productList, isLoading } = useGetProductsQuery({});
  const companyAccounts = useLazyGetCompanyAccountsListsQuery();
  const modulesList = useLazyGetProductsPermissionsListQuery();

  return {
    activeProduct,
    setActiveProduct,
    productList,
    isLoading,
    companyAccounts,
    modulesList,
  };
};

export default useProperties;
