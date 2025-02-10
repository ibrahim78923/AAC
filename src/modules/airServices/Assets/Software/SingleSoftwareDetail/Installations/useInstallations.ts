import { PAGINATION } from '@/config';
import { useState } from 'react';

export const useInstallations = () => {
  const [isPortalOpen, setIsPortalOpen] = useState({
    isOpen: false,
    action: '',
  });
  const [selectedDeviceList, setSelectedDeviceList] = useState<any[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);

  return {
    isPortalOpen,
    setIsPortalOpen,
    page,
    setPage,
    selectedDeviceList,
    setSelectedDeviceList,
    search,
    setSearch,
  };
};
