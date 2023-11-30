import { useRouter } from 'next/router';
import { useState } from 'react';
import { vendorListsColumnsFunction } from './Vendor.data';

export const useVendor = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const router = useRouter();

  const VendorListsColumns = vendorListsColumnsFunction(router);

  return {
    router,
    searchValue,
    setSearchValue,
    VendorListsColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
  };
};
