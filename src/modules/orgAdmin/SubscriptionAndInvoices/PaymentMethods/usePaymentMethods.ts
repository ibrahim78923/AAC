import { useState } from 'react';
import { columns } from './PaymentMethods.data';
import { PAGINATION } from '@/config';
import {
  useDeletePaymentCardMutation,
  useGetPaymentCardQuery,
  usePatchPaymentCardMutation,
} from '@/services/orgAdmin/subscription-and-invoices';
import { enqueueSnackbar } from 'notistack';
import { successSnackbar } from '@/utils/api';
import { getSession } from '@/utils';

const usePaymentMethods = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAddCard, setOpenAddCard] = useState(false);
  const [openEditCard, setOpenEditCard] = useState('');
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDefault, setOpenDefault] = useState(false);
  const [isGetRowValues, setIsGetRowValues] = useState<string[]>([]);
  const [page, setPage] = useState(PAGINATION?.CURRENT_PAGE);
  const [pageLimit, setPageLimit] = useState(PAGINATION?.PAGE_LIMIT);
  const [searchValue, setSearchValue] = useState('');

  const { user }: any = getSession();

  const paginationParams = {
    page: page,
    limit: pageLimit,
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }

  const { data: dataPaymentCard, isLoading: loadingPaymentCard } =
    useGetPaymentCardQuery({
      params: { ...searchPayLoad, ...paginationParams },
    });

  const [deletePaymentCard, { isLoading: loadingDelete }] =
    useDeletePaymentCardMutation();

  const [updatePaymentCard, { isLoading: loadingUpdate }] =
    usePatchPaymentCardMutation();

  const handleDelete = async () => {
    try {
      await deletePaymentCard({
        ids: isGetRowValues,
        stripeCustomerId: user?.stripeCustomerId,
      }).unwrap();
      successSnackbar('Record Deleted Successfully');
      handleCloseDeleteModal();
      handleClose();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };

  const open = Boolean(anchorEl);
  const handleActionsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpenAddCard = () => {
    setOpenAddCard(true);
    setOpenEditCard('Add');
  };
  const handleCloseAddCard = () => {
    setOpenAddCard(false);
  };
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
    handleClose();
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setIsGetRowValues([]);
  };

  const handleOpenDefaultModal = () => {
    setOpenDefault(true);
    handleClose();
  };

  const handleCloseDefaultModal = () => {
    setOpenDefault(false);
    setIsGetRowValues([]);
  };

  const handleUpdate = async () => {
    const payload = {
      stripeCustomerId: user?.stripeCustomerId,
      isDefault: true,
    };
    try {
      await updatePaymentCard({
        body: payload,
        id: isGetRowValues,
      }).unwrap();
      successSnackbar('Set Card Default Successfully');
      handleCloseDefaultModal();
      handleClose();
    } catch (error: any) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
    }
  };
  const getRowValues = columns(
    setIsGetRowValues,
    isGetRowValues,
    dataPaymentCard,
  );

  return {
    open,
    anchorEl,
    handleActionsClick,
    handleClose,
    openAddCard,
    handleOpenAddCard,
    handleCloseAddCard,
    openEditCard,
    setOpenEditCard,
    openDeleteModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    getRowValues,
    setIsGetRowValues,
    isGetRowValues,
    setOpenAddCard,
    dataPaymentCard,
    searchValue,
    setSearchValue,
    loadingPaymentCard,
    setPageLimit,
    setPage,
    loadingDelete,
    handleDelete,
    openDefault,
    handleCloseDefaultModal,
    handleUpdate,
    handleOpenDefaultModal,
    loadingUpdate,
  };
};

export default usePaymentMethods;
