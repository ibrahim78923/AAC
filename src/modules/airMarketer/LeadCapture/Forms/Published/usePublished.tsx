import { useState } from 'react';

import {
  useDeleteLeadCaptureFormMutation,
  useGetLeadCaptureFormQuery,
} from '@/services/airMarketer/lead-capture/forms';
import { PAGINATION } from '@/config';
import { formStatus } from '../Forms.data';
import { enqueueSnackbar } from 'notistack';

const usePublished = () => {
  const [selectedRow, setSelectedRow]: any = useState([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState(null);
  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetForms, isLoading: loadingGetForms } =
    useGetLeadCaptureFormQuery({
      params: {
        status: formStatus?.PUBLISHED,
        ...searchPayLoad,
        ...paginationParams,
      },
    });

  // Delete Forms
  const [deleteForm, { isLoading: loadingDelete }] =
    useDeleteLeadCaptureFormMutation();
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true);
  };
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDeleteForm = async () => {
    const formIds = await selectedRow[0];
    try {
      await deleteForm(formIds)?.unwrap();
      handleCloseModalDelete();
      enqueueSnackbar('Form has been deleted.', {
        variant: 'success',
      });
      setSelectedRow([]);
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    selectedRow,
    setSelectedRow,
    setSearchValue,
    loadingGetForms,
    dataGetForms,
    searchValue,
    setPageLimit,
    setPage,
    openModalDelete,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleDeleteForm,
    loadingDelete,
  };
};

export default usePublished;
