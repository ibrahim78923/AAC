import { useRouter } from 'next/router';
import { useState } from 'react';
import { vendorListsColumnsFunction } from './Vendor.data';

export const useVendor = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isADrawerOpen, setIsADrawerOpen] = useState(false);
  const router = useRouter();

  const vendorListsColumns = vendorListsColumnsFunction(router);

  return {
    router,
    searchValue,
    setSearchValue,
    vendorListsColumns,
    isDrawerOpen,
    setIsDrawerOpen,
    isADrawerOpen,
    setIsADrawerOpen,
  };
};
