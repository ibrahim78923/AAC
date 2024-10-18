import { PAGINATION } from '@/config';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { consumerData, consumersListColumnDynamic } from './Consumer.data';

export const useConsumer = () => {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>();
  const [selectedRoleList, setSelectedRoleList] = useState<any>([]);

  const moveToConsumer = (consumerId: any) => {
    router?.push({
      pathname: AIR_LOYALTY_PROGRAM?.UPSERT_CONSUMER,
      query: { id: consumerId },
    });
  };
  const consumersListColumn = consumersListColumnDynamic(
    moveToConsumer,
    selectedRoleList,
    setSelectedRoleList,
    consumerData,
  );
  const [customizeColumns, setCustomizeColumns] = useState<any>(
    consumersListColumn?.slice(0, 7),
  );

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchBy(data);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const actionButtonDropdown = ['Active', 'InActive'];
  const filterColumns = [
    ...consumersListColumn?.slice(0, 2),
    ...customizeColumns?.slice(2),
  ];
  return {
    searchBy,
    setSearchBy,
    page,
    setPage,
    handleSearch,
    setPageLimit,
    pageLimit,
    consumersListColumn,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    setCustomizeColumns,
    customizeColumns,
    filterColumns,
    actionButtonDropdown,
    selectedRoleList,
  };
};
