import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useDeleteAssociationMutation,
  useGetTicketsQuery,
} from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useAttachments = (dealId: any) => {
  const theme = useTheme();
  const [searchName, setSearchName] = useState('');
  const [openDrawer, setOpenDrawer] = useState<any>({
    isToggle: false,
    type: '',
    recData: {},
  });
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const attachmentParams = {
    search: searchName,
    recordId: dealId,
    recordType: ASSOCIATIONS_API_PARAMS_FOR?.DEALS,
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.ATTACHMENTS,
  };
  const {
    data: attachmentsData,
    isLoading,
    isFetching,
  } = useGetTicketsQuery(attachmentParams);

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation, { isLoading: loadingDelete }] =
    useDeleteAssociationMutation();

  const deleteAttachmentHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          attachmentId: openDrawer?.recData?._id,
        },
      })?.unwrap();
      enqueueSnackbar('Record Deleted Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsOpenAlert(false);
    } catch (error: any) {
      const errMsg = error?.data?.message;
      enqueueSnackbar(errMsg ?? 'Error occurred', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    attachmentsData,
    isLoading,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
    deleteAttachmentHandler,
    loadingDelete,
    isFetching,
  };
};

export default useAttachments;
