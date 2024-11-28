import { useState } from 'react';
import { Theme, useTheme } from '@mui/material';
import { columns } from './Templates.data';
import { useRouter } from 'next/router';
import { PAGINATION } from '@/config';
import {
  useDeleteSmsTemplateMutation,
  useGetSmsTemplatesQuery,
} from '@/services/airMarketer/SmsMarketing/Templates';
import { enqueueSnackbar } from 'notistack';

const useTemplatese = () => {
  const navigate = useRouter();
  const theme = useTheme<Theme>();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState({
    isToggle: false,
    deleteId: null,
  });
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [filterValues, setFilterValues] = useState({
    search: '',
  });
  const [deleteSmsTemplate, { isLoading: deleteTempLoading }] =
    useDeleteSmsTemplateMutation();
  const templateParams = {
    page: page,
    limit: pageLimit,
    search: filterValues?.search,
  };

  const {
    data: smsTemplateData,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetSmsTemplatesQuery(templateParams);

  const deleteTemplete = async (id: any) => {
    await deleteSmsTemplate(id)?.unwrap();
    enqueueSnackbar('Template Deleted Successfully', { variant: 'success' });
    setIsOpenDeleteModal({ ...isOpenDeleteModal, isToggle: false });
  };

  const handleCloseAlert = () => {
    setIsOpenDeleteModal({ ...isOpenDeleteModal, isToggle: false });
  };

  const getRowValues = columns(setIsOpenDeleteModal, navigate, theme);

  return {
    theme,
    getRowValues,
    isOpenDeleteModal,
    handleCloseAlert,
    deleteTemplete,
    navigate,
    setPageLimit,
    setPage,
    isLoading,
    isSuccess,
    filterValues,
    setFilterValues,
    smsTemplateData,
    deleteTempLoading,
    isFetching,
  };
};

export default useTemplatese;
