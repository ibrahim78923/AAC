import { useState } from 'react';

import { useTheme } from '@mui/material';
import { PAGINATION } from '@/config';
import { enqueueSnackbar } from 'notistack';
import {
  useGetCompanyAssociationsQuery,
  usePostAssociationCompaniesMutation,
} from '@/services/commonFeatures/companies';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useAttachments = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [RowData, setRowData] = useState('');
  const [attachmentId, setAttachmentId] = useState('');

  const paramObj = {
    search: searchName,
    recordId: companyId?.companyId,
    recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.ATTACHMENTS,
  };
  const { data: getCompanyAttachment, isLoading } =
    useGetCompanyAssociationsQuery({
      page,
      pageLimit,
      params: paramObj,
    });
  const [PostAssociationCompanies, { isLoading: loadingDelete }] =
    usePostAssociationCompaniesMutation();

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const handleOpenAlert = (id: string) => {
    setAttachmentId(id);
    setIsOpenAlert(true);
  };

  const handleDeleteAttachment = async () => {
    const payload = {
      recordId: companyId?.companyId,
      recordType: ASSOCIATIONS_API_PARAMS_FOR?.COMPANIES,
      operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
      attachmentsIds: [attachmentId],
    };

    try {
      await PostAssociationCompanies({ body: payload }).unwrap();
      enqueueSnackbar('Record Deleted Successfully', { variant: 'success' });
      setIsOpenAlert(false);
      setRowData('');
    } catch (error) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', { variant: 'error' });
    }
  };
  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    isLoading,
    setPage,
    setPageLimit,
    getCompanyAttachment,
    RowData,
    setRowData,
    handleDeleteAttachment,
    loadingDelete,
    handleOpenAlert,
  };
};

export default useAttachments;
