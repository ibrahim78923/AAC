import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { consumerData, consumersListColumnDynamic } from './Consumer.data';
import {
  useGetLoyaltyProgramConsumersListQuery,
  usePatchLoyaltyProgramConsumersStatusMutation,
} from '@/services/airLoyaltyProgram/consumers';
import { IErrorResponse } from './Consumer.interface';
import { AIR_LOYALTY_PROGRAM } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

export const useConsumer = () => {
  const router = useRouter();
  const [searchBy, setSearchBy] = useState('');
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [isDrawerOpen, setIsDrawerOpen] = useState<any>();
  const [selectedRoleList, setSelectedRoleList] = useState<any>([]);

  const { data, isLoading, isError, isFetching, isSuccess } =
    useGetLoyaltyProgramConsumersListQuery(
      {},
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
  const actionButtonDropdown = ['Active', 'InActive'];
  const [
    patchLoyaltyProgramConsumersTrigger,
    patchLoyaltyProgramConsumersStatus,
  ] = usePatchLoyaltyProgramConsumersStatusMutation();

  const handleStatusChange = async (info: any, event: any) => {
    const patchLoyaltyProgramConsumersStatusParameter = {
      queryParams: { _id: info?._id },
      body: { status: event?.target?.value },
    };

    try {
      await patchLoyaltyProgramConsumersTrigger(
        patchLoyaltyProgramConsumersStatusParameter,
      )?.unwrap();
      setSelectedRoleList([]);
      successSnackbar('Status Updated successfully!');
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
    }
  };
  const consumersListColumn = consumersListColumnDynamic(
    moveToConsumer,
    selectedRoleList,
    setSelectedRoleList,
    consumerData,
    handleStatusChange,
  );
  const [customizeColumns, setCustomizeColumns] = useState<any>(
    consumersListColumn?.slice(0, 7),
  );
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
    handleStatusChange,
    actionButtonDropdown,
    selectedRoleList,
    data,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    patchLoyaltyProgramConsumersStatus,
  };
};
