import { useState } from 'react';
import { PAGINATION } from '@/config';
import {
  useDeleteWhatsappTemplateMutation,
  useGetWhatsappTemplatesQuery,
} from '@/services/airMarketer/whatsappMarketing/templates';
import { enqueueSnackbar } from 'notistack';

const useTemplates = () => {
  const [searchBy, setSearchBy] = useState('');
  const [limit, setLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [deleteTemplateModal, setDeleteTemplateModal] = useState({
    isOpen: false,
    id: '',
  });

  const [deleteWhatsappTemplate, { isLoading: deleteTempLoading }] =
    useDeleteWhatsappTemplateMutation();

  const getTemplatesParams = {
    page,
    limit,
    search: searchBy ? searchBy : undefined,
  };
  const {
    data: getTemplatesData,
    isLoading: getTempLoading,
    isSuccess: getTempSuccess,
    isFetching: getTempFetching,
  } = useGetWhatsappTemplatesQuery(getTemplatesParams);

  const deleteTemplateHandler = async (id: any) => {
    await deleteWhatsappTemplate(id)?.unwrap();
    enqueueSnackbar('Template deleted successfully', { variant: 'success' });
    setDeleteTemplateModal({ isOpen: false, id: '' });
  };

  return {
    setPage,
    setLimit,
    searchBy,
    setSearchBy,
    getTempSuccess,
    getTempLoading,
    getTempFetching,
    getTemplatesData,
    deleteTempLoading,
    deleteTemplateModal,
    deleteTemplateHandler,
    setDeleteTemplateModal,
  };
};

export default useTemplates;
