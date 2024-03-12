import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';
import { usePostAttachmentMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';

const useAttachments = (contactId: any) => {
  // Get Association Tickets
  const [searchValue, setSearchValue] = useState(null);

  const payLoad = {
    contactId: contactId,
    association_type: 'attachments',
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetAttachment, isLoading: loadingTickets } =
    useGetContactAssociationsQuery({
      params: { ...payLoad, ...searchPayLoad },
    });

  // Add Attachment
  const [postAttachment, { isLoading: loadingAddCompanyAccount }] =
    usePostAttachmentMutation();
  // const [openModalAddFaq, setOpenModalAddFaq] = useState(false);
  // const methodsAddFaqs = useForm({
  //   resolver: yupResolver(addFaqsValidationSchema),
  //   defaultValues: addFaqsDefaultValues,
  // });

  // const { handleSubmit: handleMethodAddFaq, reset: resetAddFaqForm } =
  //   methodsAddFaqs;

  // const handleOpenModalFaq = (title: string) => {
  //   setModalTitle(title);
  //   setOpenModalAddFaq(true);
  //   handleActionsMenuClose();
  // };
  // const handleCloseModalFaq = () => {
  //   setOpenModalAddFaq(false);
  //   resetAddFaqForm();
  // };

  // const onSubmitAddFaq = async (values: any) => {
  //   try {
  //     await postAddFaq({ body: values })?.unwrap();
  //     handleCloseModalFaq();
  //     enqueueSnackbar('FAQ added successfully', {
  //       variant: 'success',
  //     });
  //   } catch (error: any) {
  //     enqueueSnackbar('An error occured', {
  //       variant: 'error',
  //     });
  //   }
  // };
  // const handleAddFaqSubmit = handleMethodAddFaq(onSubmitAddFaq);

  // Drawer Edit
  const methodsAttachments = useForm({});
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [isDisabledFields, setIsDisabledFields] = useState(true);
  const handleOpenDrawer = (title: any, data: any) => {
    setDrawerTitle(title);

    if (data) {
      methodsAttachments.setValue('name', data?.name);
      methodsAttachments.setValue('dealPiplineId', data?.dealPiplineId);
      methodsAttachments.setValue('dealStageId', data?.dealStageId);
      methodsAttachments.setValue('amount', data?.amount);
      methodsAttachments.setValue('closeDate', new Date(data?.closeDate));
      methodsAttachments.setValue('ownerId', data?.ownerId);
      methodsAttachments.setValue('priority', data?.priority);
      methodsAttachments.setValue('addLineItemId', data?.addLineItemId);
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  // Delete Modal
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };

  const theme = useTheme();

  return {
    searchValue,
    setSearchValue,
    loadingTickets,
    dataGetAttachment,

    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsAttachments,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    loadingAddCompanyAccount,
    postAttachment,
    theme,
  };
};

export default useAttachments;
