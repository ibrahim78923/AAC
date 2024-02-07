import { useState } from 'react';
import dayjs from 'dayjs';
import { useTheme } from '@mui/material';
import { useLazyGetContractHistoryQuery } from '@/services/airServices/assets/contracts/single-contract-details/contract-history';

export const useContractHistory = () => {
  const theme = useTheme();

  const [page, setPage] = useState(1);

  const [pageLimit, setPageLimit] = useState(10);
  const { data } = useLazyGetContractHistoryQuery();

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const contractHistoryData =
    data?.data?.contracts?.map((activity: any) => ({
      createdBy: activity?.name || '---',
      createdByOne: `${activity?.name} ${activity?.name}` || '---',
      timeOne:
        (activity?.createdAt &&
          dayjs(activity?.createdAt)?.format('ddd, D MMM, YYYY h:mm A')) ||
        '---',
      timeTwo: activity?.cost || '---',
    })) || [];

  const paginationData = data?.data?.meta;

  return {
    contractHistoryData,
    handlePageChange,
    paginationData,
    pageLimit,
    page,
    setPageLimit,
    setPage,
    theme,
  };
};
