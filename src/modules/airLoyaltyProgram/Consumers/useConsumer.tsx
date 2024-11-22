import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  consumersListColumnDynamic,
  getHeaderActionButtonDropdown,
} from './Consumer.data';
import {
  useGetLoyaltyProgramConsumersListQuery,
  usePutLoyaltyProgramConsumersStatusMutation,
} from '@/services/airLoyaltyProgram/consumers';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { IErrorResponse } from '@/types/shared/ErrorResponse';

export const useConsumer = () => {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>();
  const [selectedConsumerList, setSelectedConsumersList] = useState<any>([]);

  const { data, isLoading, isError, isFetching, isSuccess, refetch } =
    useGetLoyaltyProgramConsumersListQuery(
      { page, limit: pageLimit, search: searchBy },
      { refetchOnMountOrArgChange: true },
    );

  const moveToConsumer = (consumerId: any) => {
    router?.push({
      pathname: AIR_LOYALTY_PROGRAM?.UPSERT_CONSUMER,
      query: { id: consumerId },
    });
  };

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

  const consumersListColumn = consumersListColumnDynamic(
    moveToConsumer,
    selectedConsumerList,
    setSelectedConsumersList,
    data?.data?.consumers,
  );

  const [customizeColumns, setCustomizeColumns] = useState<any>(
    consumersListColumn?.slice(0, 7),
  );

  const filterColumns = [
    ...consumersListColumn?.slice(0, 2),
    ...customizeColumns?.slice(2),
  ];

  const [trigger, statusQuery] = usePutLoyaltyProgramConsumersStatusMutation();

  const handleHeaderActionButtonStatusChange = async (status: string) => {
    if (!trigger) return;

    const ids = selectedConsumerList.map((role: any) => role._id);
    try {
      await trigger({
        status,
        ids,
      })?.unwrap();
      successSnackbar('Status updated successfully!');
      setSelectedConsumersList([]);
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };

  const headerActionButtonDropdown = getHeaderActionButtonDropdown(
    handleHeaderActionButtonStatusChange,
  );

  return {
    handleSearch,
    consumersListColumn,
    isDrawerOpen,
    closeDrawer,
    openDrawer,
    setCustomizeColumns,
    customizeColumns,
    filterColumns,
    selectedConsumerList,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    refetch,
    page,
    setPage,
    setPageLimit,
    pageLimit,
    headerActionButtonDropdown,
    statusQuery,
  };
};
