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
import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';

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
      const notifyMembers = !!data.notifyMembers;
      const payload = {
        title: data?.title,
        description: data?.description,
        managedById: data?.managedById?._id,
        vibilityId: data?.vibilityId?._id,
        notifyMembers: notifyMembers,
        additionalEmail: data?.additionalEmail,
        addMembers: data?.addMembers,
        startDate: new Date(data.startDate).toISOString(),
        endDate: new Date(data.endDate).toISOString(),
      };
      const postAnnouncementParameter = {
        body: payload,
      };

      await addAnnouncements(postAnnouncementParameter).unwrap();
      successSnackbar('Announcements added successfully.');
      setIsDrawerOpen(false);
    } catch (error: any) {
      errorSnackbar('Something went wrong');
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

  const departmentDropdown = useLazyGetDepartmentDropdownQuery();
  const userDropdown = useLazyGetUsersDropdownListQuery();

  return {
    isDrawerOpen,
    setIsDrawerOpen,
    methods,
    handleSubmit,
    submit,
    handleClose,
    theme,
    handleIconButton,
    departmentDropdown,
    userDropdown,
  };
};
