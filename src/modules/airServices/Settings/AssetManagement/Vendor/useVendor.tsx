import { useRouter } from 'next/router';
import { useState } from 'react';
import { vendorListsColumnsFunction } from './Vendor.data';

export const useVendor = () => {
  const [searchValue, SetSearchValue] = useState<string>('');
  const router = useRouter();

  const VendorListsColumns = vendorListsColumnsFunction(router);

  return {
    router,
    searchValue,
    SetSearchValue,
    VendorListsColumns,
  };
};
