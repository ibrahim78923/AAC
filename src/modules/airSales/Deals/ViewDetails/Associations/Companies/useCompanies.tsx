import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useDeleteAssociationMutation } from '@/services/airSales/deals/view-details/association';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

const useCompanies = (dealId: any) => {
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [companyRecord, setCompanyRecord] = useState<any>({});

  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const [deleteAssociation, { isLoading: loadingDelete }] =
    useDeleteAssociationMutation();

  const deleteCompanyHandler = async () => {
    try {
      await deleteAssociation({
        body: {
          dealId: dealId,
          companyId: companyRecord?._id,
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
    openDrawer,
    isOpenAlert,
    setOpenDrawer,
    setIsOpenAlert,
    handleCloseAlert,
    companyRecord,
    setCompanyRecord,
    loadingDelete,
    deleteCompanyHandler,
  };
};

export default useCompanies;
