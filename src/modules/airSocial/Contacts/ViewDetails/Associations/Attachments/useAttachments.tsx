import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts';
import { useForm } from 'react-hook-form';
import { usePostAttachmentMutation } from '@/services/commonFeatures/contacts/associations';
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
  const [postAttachment, { isLoading: loadingAddAttachment }] =
    usePostAttachmentMutation();
  const {
    handleSubmit: handleMethodAddAttachment,
    reset: resetAddAttachmentForm,
  } = methodsAttachments;
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [attachmentData, setAttachmentData] = useState();
  const handleOpenDrawer = (title: any, data: any) => {
    setDrawerTitle(title);
    setAttachmentData(data);
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    resetAddAttachmentForm();
  };

  // Add Attachment
  const onSubmitAddAttachment = async (values: any) => {
    const formData = new FormData();
    formData?.append('fileUrl', values?.attachment);
    formData?.append('recordId', contactId);
    formData?.append('module', 'CONTACT');
    formData?.append('recordType', 'contacts');
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
    loadingAddAttachment,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    postAttachment,
    theme,
    attachmentData,
  };
};

export default useAttachments;
