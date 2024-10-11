import { PAGINATION } from '@/config';
import {
  useDeleteAirServicesSettingsCannedResponseMutation,
  useLazyGetAirServicesSettingsCannedResponsesQuery,
} from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { IErrorResponse } from '@/types/shared/ErrorResponse';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useCannedResponses = () => {
  const router = useRouter();

  const [openModal, setOpenModal] = useState<any>({
    create: false,
    delete: false,
    editData: null,
  });

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<string>('');

  const getCannedResponsesParam = new URLSearchParams();

  getCannedResponsesParam?.append('page', page + '');
  getCannedResponsesParam?.append('limit', pageLimit + '');
  getCannedResponsesParam?.append('search', search);

  const getCannedResponsesParameter = {
    queryParams: getCannedResponsesParam,
  };

  const [lazyGetCannedResponsesTrigger, lazyGetCannedResponsesStatus] =
    useLazyGetAirServicesSettingsCannedResponsesQuery();

  const cannedResponses =
    lazyGetCannedResponsesStatus?.data?.data?.cannedresponses;

  const cannedResponsesMetaData =
    lazyGetCannedResponsesStatus?.data?.data?.meta;

  const getCannedResponsesListData = async () => {
    try {
      await lazyGetCannedResponsesTrigger(
        getCannedResponsesParameter,
      )?.unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getCannedResponsesListData();
  }, [search, page, pageLimit]);

  const handleSearch = (data: any) => {
    setPage(PAGINATION?.CURRENT_PAGE);
    setSearch(data);
  };

  const convertToHyphenCase = (str: string): string => {
    return str
      ?.split(' ')
      ?.map((word) => word?.toLowerCase())
      ?.join('-');
  };

  const [deleteCannedResponseTrigger, { isLoading }] =
    useDeleteAirServicesSettingsCannedResponseMutation();

  const deleteCannedResponse = async () => {
    const deleteParams = new URLSearchParams();
    deleteParams?.append('id', openModal?.editData?._id);
    const deleteCannedResponseParameter = {
      queryParams: deleteParams,
    };
    try {
      await deleteCannedResponseTrigger(
        deleteCannedResponseParameter,
      )?.unwrap();
      successSnackbar('Folder deleted successfully');
      setOpenModal({ open: false, delete: false, editData: null });
    } catch (error) {
      const errorResponse = error as IErrorResponse;
      errorSnackbar(errorResponse?.data?.message);
      setOpenModal({ open: false, delete: false, editData: null });
    }
  };

  return {
    router,
    convertToHyphenCase,
    setOpenModal,
    openModal,
    search,
    handleSearch,
    cannedResponses,
    lazyGetCannedResponsesStatus,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    cannedResponsesMetaData,
    deleteCannedResponse,
    isLoading,
    getCannedResponsesListData,
  };
};
