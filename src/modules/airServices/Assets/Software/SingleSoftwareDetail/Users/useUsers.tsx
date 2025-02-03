import { PAGINATION } from '@/config';
import { useState } from 'react';
import { SoftwareUserDataI } from './Users.interface';

export const useUsers = () => {
  const [usersData, setUsersData] = useState<SoftwareUserDataI[]>([]);
  const [isPortalOpen, setIsPortalOpen] = useState<any>({
    isOpen: true,
    action: '',
  });

  const [search, setSearch] = useState<string>('');

  const [page, setPage] = useState<number>(PAGINATION?.CURRENT_PAGE);

  return {
    usersData,
    setUsersData,
    page,
    setPage,
    isPortalOpen,
    setIsPortalOpen,
    search,
    setSearch,
  };
};
