import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import { useGetContactAssociationsQuery } from '@/services/commonFeatures/contacts/associations';
import { useForm } from 'react-hook-form';
import {
  usePostAttachmentMutation,
  useDeleteAttachmentMutation,
} from '@/services/commonFeatures/contacts/associations/attachments';
import {
  attachmentsDefaultValues,
  attachmentsValidationSchema,
} from './AttachmentsEditorDrawer/AttachmentsEditorDrawer.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';

const useAttachments = (contactId: any) => {
  const theme = useTheme();
  // Get Association Attachments
  const [searchValue, setSearchValue] = useState(null);
  const payLoad = {
    contactId: contactId,
    association_type: 'attachments',
  };

  let searchPayLoad;
  if (searchValue) {
    searchPayLoad = { search: searchValue };
  }
  const { data: dataGetAttachment, isLoading: loadingGetAttachment } =
    useGetContactAssociationsQuery({
      params: { ...payLoad, ...searchPayLoad },
    });

  // Drawer Add/Edit/View Attachment
  const [drawerTitle, setDrawerTitle] = useState('Add');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [attachmentData, setAttachmentData] = useState();

  const methodsAttachments = useForm({
    resolver: yupResolver(attachmentsValidationSchema),
    defaultValues: attachmentsDefaultValues(attachmentData),
  });
  const [postAttachment, { isLoading: loadingAddAttachment }] =
    usePostAttachmentMutation();
  const {
    handleSubmit: handleMethodAddAttachment,
    reset: resetAddAttachmentForm,
  } = methodsAttachments;

  useEffect(() => {
    resetAddAttachmentForm(attachmentsDefaultValues(attachmentData));
  }, [attachmentData, resetAddAttachmentForm]);

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

  // Delete Attachment
  const [attachmentId, setAttachmentId] = useState('');
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const handleOpenAlert = (id: string) => {
    setAttachmentId(id);
    setIsOpenAlert(true);
  };
  const handleCloseAlert = () => {
    setIsOpenAlert(false);
  };
  const [deleteAttachment, { isLoading: loadingDelete }] =
    useDeleteAttachmentMutation();

  const handleDeleteAttachment = async () => {
    try {
      await deleteAttachment(attachmentId)?.unwrap();
      handleCloseAlert();
      enqueueSnackbar('Record has been deleted.', {
        variant: 'success',
      });
    } catch (error: any) {
      enqueueSnackbar('An error occured', {
        variant: 'error',
      });
    }
  };

  return {
    searchValue,
    setSearchValue,
    loadingGetAttachment,
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

    handleDeleteAttachment,
    loadingDelete,
  };
};

export default useAttachments;
