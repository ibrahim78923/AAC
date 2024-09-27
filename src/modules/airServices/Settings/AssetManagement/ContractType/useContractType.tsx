import { useRouter } from 'next/router';
import { useState } from 'react';
import { PAGINATION } from '@/config';
import {
  useDeleteContractTypeMutation,
  useGetSettingsContractTypeListQuery,
} from '@/services/airServices/settings/asset-management/contract-type';
import { getContractTypeColumns } from './ContractType.data';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useContractType() {
  const router: any = useRouter();
  const [openDialog, setOpenDialog] = useState({ open: false, data: null });
  const [deleteModalOpen, setDeleteModalOpen] = useState({
    open: false,
    id: null,
  });

  const contractTypeColumns = getContractTypeColumns(
    setOpenDialog,
    setDeleteModalOpen,
  );

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);

  const params = {
    page: page,
    limit: pageLimit,
    meta: true,
  };

  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useGetSettingsContractTypeListQuery(params, {
      refetchOnMountOrArgChange: true,
    });

  const [deleteContractTypeTrigger, deleteContractTypeStatus] =
    useDeleteContractTypeMutation();

  const handleDeleteBtn = async () => {
    const params = {
      ids: deleteModalOpen?.id,
    };
    try {
      await deleteContractTypeTrigger(params)?.unwrap();
      successSnackbar('Contract Type Deleted Successfully!');
      setDeleteModalOpen({
        open: false,
        id: null,
      });
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      setDeleteModalOpen({
        open: false,
        id: null,
      });
    }
  };

  return {
    router,
    setOpenDialog,
    isLoading,
    isFetching,
    data,
    contractTypeColumns,
    isError,
    isSuccess,
    openDialog,
    setDeleteModalOpen,
    setPage,
    setPageLimit,
    deleteModalOpen,
    handleDeleteBtn,
    deleteContractTypeStatus,
    refetch,
  };
}
