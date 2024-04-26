import { useState } from 'react';

import { useTheme } from '@mui/material';
import { useGetAttachmentQuery } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';
import { PAGINATION } from '@/config';
import { useDeleteAttachmentMutation } from '@/services/commonFeatures/contacts/associations/attachments';
import { enqueueSnackbar } from 'notistack';

const useAttachments = (companyId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [RowData, setRowData] = useState('');
  const [attachmentId, setAttachmentId] = useState('');

  // const searchObj = {
  //   search: searchName,
  //    id: companyId?.companyId,
  // };

  const { data: getCompanyAttachment, isLoading } = useGetAttachmentQuery({
    page,
    pageLimit,
    // params: searchObj,
    id: companyId?.companyId,
  });
  const [deleteAttachment, { isLoading: loadingDelete }] =
    useDeleteAttachmentMutation();

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const handleOpenAlert = (id: string) => {
    setAttachmentId(id);
    setIsOpenAlert(true);
  };

  const handleDeleteAttachment = async () => {
    try {
      await deleteAttachment(attachmentId)?.unwrap();
      handleCloseAlert();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
      setRowData('');
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
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
