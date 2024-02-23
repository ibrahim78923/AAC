import { usePostAnnouncementMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { useTheme } from '@emotion/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createAddAnnouncementDefaultValues,
  createAddAnnouncementValidationSchema,
} from '../AddAnnouncement/AddAnnouncement.data';

export const useAnnouncementHeader = () => {
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const methods: any = useForm({
    resolver: yupResolver(createAddAnnouncementValidationSchema),
    defaultValues: createAddAnnouncementDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [addAnnouncements] = usePostAnnouncementMutation();
  const submit = async (data: any) => {
    try {
      const payload = {
        title: data?.title,
        description: data?.description,
        managedById: data?.managedById,
        vibilityId: data?.vibilityId,
        notifyMembers: data?.notifyMembers,
        additionalEmail: data?.additionalEmail,
        addMembers: data?.addMembers,
      };
      await addAnnouncements({
        ...payload,
      }).unwrap();
      successSnackbar(true);
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar();
    }
    handleClose?.();
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };

  const handleIconButton = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methods,
    handleSubmit,
    submit,
    handleClose,
    theme,
    handleIconButton,
  };
};
