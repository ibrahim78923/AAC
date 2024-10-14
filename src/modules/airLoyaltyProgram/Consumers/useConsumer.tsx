import { PAGINATION } from '@/config';
import { AIR_LOYALTY_PROGRAM } from '@/constants';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { consumersListColumnDynamic } from './Consumer.data';

export const useConsumer = () => {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState('');

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearchBy(data);
  };
  const moveToConsumer = () => {
    router?.push({
      pathname: AIR_LOYALTY_PROGRAM?.UPSERT_CONSUMER,
    });
  };
  const consumersListColumn = consumersListColumnDynamic(moveToConsumer);
  return {
    searchBy,
    setSearchBy,
    page,
    setPage,
    handleSearch,
    setPageLimit,
    pageLimit,
    consumersListColumn,
  };
};
