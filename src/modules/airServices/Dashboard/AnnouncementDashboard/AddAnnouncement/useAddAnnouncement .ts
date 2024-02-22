import { useState } from 'react';
import { useTheme } from '@mui/material';
import { usePostAnnouncementMutation } from '@/services/airServices/dashboard';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { upsertRequestersDefaultValues, upsertRequestersValidationSchema } from '@/modules/airServices/Settings/UserManagement/Requesters/UpsertRequesters/UpsertRequesters.data';
import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { enqueueSnackbar } from 'notistack';

export function useAddAnnouncement() {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const handleIconButton = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const methods: any = useForm({
    resolver: yupResolver(upsertRequestersValidationSchema),
    defaultValues: upsertRequestersDefaultValues(null),
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
        addMember: data?.addMember,
      };
      await addAnnouncements({ ...payload, role: ROLES?.ORG_REQUESTER }).unwrap();
      enqueueSnackbar(' Requesters Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      setIsDrawerOpen(false);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message?.[0] || 'Email Already Exists!';

      enqueueSnackbar(errorMessage, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
    handleClose?.();
  };
  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };
  return {
    setIsDrawerOpen,
    isDrawerOpen,
    theme,
    handleIconButton,
    methods,
    handleSubmit,
    submit,
    handleClose,
  };
}
