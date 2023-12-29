import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { responsesTableColumns } from './ResponsesList.data';
import { CANNED_RESPONSES, NOTISTACK_VARIANTS } from '@/constants/strings';
import { useLazyGetResponsesListQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useSearchParams } from 'next/navigation';

export const useResponsesList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cannedResponseId: any = searchParams.get('id');
  const [selectedData, setSelectedData] = useState([]);
  const [openAddResponseDrawer, setOpenAddResponseDrawer] = useState(false);
  const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');
  const getResponsesListParam = new URLSearchParams();
  getResponsesListParam?.append('page', page + '');
  getResponsesListParam?.append('limit', pageLimit + '');
  getResponsesListParam?.append('search', search + '');
  getResponsesListParam?.append('folderId', cannedResponseId);
  const getResponsesListParameter = {
    queryParams: getResponsesListParam,
  };

  const [lazyGetResponsesListTrigger, lazyGetResponsesListStatus] =
    useLazyGetResponsesListQuery();
  const responsesList = lazyGetResponsesListStatus?.data?.data?.responses;
  const responsesListMetaData = lazyGetResponsesListStatus?.data?.data?.meta;
  const getResponsesListListData = async () => {
    try {
      const response = await lazyGetResponsesListTrigger(
        getResponsesListParameter,
      )?.unwrap();
      enqueueSnackbar(
        response?.message ?? 'Canned Responses Retrieved successfully',
        {
          variant: NOTISTACK_VARIANTS?.SUCCESS,
        },
      );
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message ?? 'Error', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    getResponsesListListData();
  }, [search, page, pageLimit, cannedResponseId]);
  const handleActionClick = (ActionType: string) => {
    // open delete modal on selected action type
    if (ActionType === CANNED_RESPONSES?.DELETE) {
      return setDeleteModal(true);
    }
    if (ActionType === CANNED_RESPONSES?.EDIT) {
      if (selectedData?.length > 1) {
        enqueueSnackbar(`Can't update multiple records`, {
          variant: 'error',
        });
        return;
      }
      return setOpenAddResponseDrawer(true);
    }
    if (ActionType === CANNED_RESPONSES?.MOVE) {
      return setOpenMoveFolderModal(true);
    }
  };
  const convertToTitleCase = (str: any): string => {
    return str
      ?.split?.('-')
      ?.map?.(
        (word: string) => word?.charAt?.(0)?.toUpperCase?.() + word?.slice?.(1),
      )
      ?.join?.(' ');
  };
  const tableColumns = responsesTableColumns(
    selectedData,
    setSelectedData,
    responsesList,
  );
  return {
    setOpenMoveFolderModal,
    openMoveFolderModal,
    setDeleteModal,
    setSelectedData,
    deleteModal,
    setOpenAddResponseDrawer,
    setPageLimit,
    setPage,
    pageLimit,
    page,
    openAddResponseDrawer,
    selectedData,
    convertToTitleCase,
    router,
    handleActionClick,
    tableColumns,
    search,
    setSearch,
    responsesList,
    responsesListMetaData,
    lazyGetResponsesListStatus,
  };
};
