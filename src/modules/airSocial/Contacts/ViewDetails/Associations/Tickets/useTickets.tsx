import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
  useGetAssociationQuery,
  usePostAssociationMutation,
} from '@/services/commonFeatures/contacts/associations';
import { DRAWER_TITLE } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import { NOTISTACK_VARIANTS } from '@/constants/strings';
import { ASSOCIATIONS_API_PARAMS_FOR } from '@/constants';

const useTickets = (contactId: any) => {
  const theme = useTheme();

  // Get Association Tickets
  const [searchValue, setSearchValue] = useState(null);
  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const filterParams = {
    recordId: contactId,
    recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
    associationType: ASSOCIATIONS_API_PARAMS_FOR?.TICKETS,
  };
  const { data: dataGetTickets, isLoading: loadingTickets } =
    useGetAssociationQuery({
      params: { ...searchPayLoad, ...filterParams },
    });

  const [postAssociation, { isLoading: loadingPostAssociation }] =
    usePostAssociationMutation();

  const [drawerTitle, setDrawerTitle] = useState(DRAWER_TITLE?.VIEW);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDisabledFields, setIsDisabledFields] = useState(true);

  const handleOpenDrawer = (title: string, data: any) => {
    const flag = title === DRAWER_TITLE?.VIEW;
    if (flag && data) {
      setOpenDrawer(true);
    }
    setDrawerTitle(title);
    setIsDisabledFields(flag);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Remove Association
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [ticketId, setTicketId] = useState<string>('');
  const handleOpenAlert = (id: string) => {
    setTicketId(id);
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const handleRemoveAssociation = async () => {
    try {
      await postAssociation({
        body: {
          recordId: contactId,
          recordType: ASSOCIATIONS_API_PARAMS_FOR?.CONTACTS,
          ticketsIds: [ticketId],
          operation: ASSOCIATIONS_API_PARAMS_FOR?.REMOVE,
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
    setSearchValue,
    loadingTickets,
    dataGetTickets,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,

    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    handleRemoveAssociation,
    loadingPostAssociation,
    isDisabledFields,
  };
};

export default useTickets;
