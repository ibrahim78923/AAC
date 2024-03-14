import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';
import { usePostAttachmentMutation } from '@/services/airServices/assets/purchase-orders/single-purchase-order-details/attachments';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer/AttachmentsEditorDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

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

  // Drawer Add/Edit/View Attachment
  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues,
  });
  const [postAttachment, { isLoading: loadingAddCompanyAccount }] =
    usePostAttachmentMutation();
  const {
    handleSubmit: handleMethodAddAttachment,
    reset: resetAddAttachmentForm,
  } = methodsAttachments;
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = (title: any, data: any) => {
    setDrawerTitle(title);
    // if (title === 'Add') {
    //   console.log('Add open');
    // }

    // if (title === 'Edit') {
    //   console.log('Edit Open');
    // }

    // if (title === 'View') {
    //   console.log('View Open');
    // }
    if (data) {
      // methodsAttachments.setValue('name', data?.name);
      // methodsAttachments.setValue('dealPiplineId', data?.dealPiplineId);
      // methodsAttachments.setValue('dealStageId', data?.dealStageId);
      // methodsAttachments.setValue('amount', data?.amount);
      // methodsAttachments.setValue('closeDate', new Date(data?.closeDate));
      // methodsAttachments.setValue('ownerId', data?.ownerId);
      // methodsAttachments.setValue('priority', data?.priority);
      // methodsAttachments.setValue('addLineItemId', data?.addLineItemId);
    }
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    resetAddAttachmentForm();
  };

  // Add Attachment
  const onSubmitAddAttachment = async (values: any) => {
    const formData = new FormData();
    formData?.append('fileUrl', values?.fileUrl);
    formData?.append('module', 'CONTACT');
    formData?.append('recordId', contactId);
    try {
      await postAttachment(formData)?.unwrap();
      handleCloseDrawer();
      enqueueSnackbar('Attachment added successfully', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };
  const handleAddAttachmentSubmit = handleMethodAddAttachment(
    onSubmitAddAttachment,
  );

  // const [isDisabledFields, setIsDisabledFields] = useState(true);

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
    handleAddAttachmentSubmit,
    loadingAddCompanyAccount,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    postAttachment,
    theme,
  };
};

export default useAttachments;
