import { PAGINATION } from '@/config';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import {
  ACTION_TYPES,
  responsesTableColumns,
  responsesTableData,
} from './ResponsesList.data';

export const useResponsesList = () => {
  const router = useRouter();
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [selectedData, setSelectedData] = useState([]);
  const [openAddResponseDrawer, setOpenAddResponseDrawer] = useState(false);
  const [openMoveFolderModal, setOpenMoveFolderModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const handleActionClick = (ActionType: string) => {
    // open delete modal on selected action type
    if (ActionType === ACTION_TYPES?.DELETE) {
      return setDeleteModal(true);
    }
    if (ActionType === ACTION_TYPES?.EDIT) {
      if (selectedData?.length > 1) {
        enqueueSnackbar(`Can't update multiple records`, {
          variant: 'error',
        });
        return;
      }
      return setOpenAddResponseDrawer(true);
    }
    if (ActionType === ACTION_TYPES?.MOVE) {
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
    responsesTableData,
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
  };
};
