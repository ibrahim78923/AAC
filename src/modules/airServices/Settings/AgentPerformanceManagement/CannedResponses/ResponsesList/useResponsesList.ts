import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { responsesTableColumns } from './ResponsesList.data';
import { CANNED_RESPONSES } from '@/constants/strings';
import { useLazyGetResponsesListQuery } from '@/services/airServices/settings/agent-performance-management/canned-responses';
import { useSearchParams } from 'next/navigation';
import { errorSnackbar } from '@/utils/api';

export const useResponsesList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cannedResponseId, setCannedResponseId] = useState<any>('');
  const [selectedData, setSelectedData] = useState([]);
  const [openAddResponseDrawer, setOpenAddResponseDrawer] = useState(false);
  const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [search, setSearch] = useState<any>('');

  const [lazyGetResponsesListTrigger, lazyGetResponsesListStatus] =
    useLazyGetResponsesListQuery();
  const responsesList = lazyGetResponsesListStatus?.data?.data?.responses;
  const responsesListMetaData = lazyGetResponsesListStatus?.data?.data?.meta;

  const getResponsesListListData = async (currentPage = page) => {
    const getResponsesListParam = new URLSearchParams();

    getResponsesListParam?.append('page', currentPage + '');
    getResponsesListParam?.append('limit', pageLimit + '');
    getResponsesListParam?.append('search', search + '');
    getResponsesListParam?.append('folderId', cannedResponseId);
    const getResponsesListParameter = {
      queryParams: getResponsesListParam,
    };
    try {
      await lazyGetResponsesListTrigger(getResponsesListParameter)?.unwrap();
    } catch (error: any) {}
  };

  useEffect(() => {
    if (cannedResponseId) {
      getResponsesListListData?.(page);
    }
  }, [search, page, pageLimit, cannedResponseId]);

  const handleActionClick = (ActionType: string) => {
    if (ActionType === CANNED_RESPONSES?.DELETE) {
      return setDeleteModal(true);
    }
    if (ActionType === CANNED_RESPONSES?.EDIT) {
      if (selectedData?.length > 1) {
        errorSnackbar(`Can't update multiple records`);
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

  useEffect(() => {
    if (router?.isReady) {
      setCannedResponseId(searchParams?.get('id'));
    }
  }, [router?.isReady]);

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
    setSearch,
    responsesList,
    responsesListMetaData,
    lazyGetResponsesListStatus,
    getResponsesListListData,
  };
};
