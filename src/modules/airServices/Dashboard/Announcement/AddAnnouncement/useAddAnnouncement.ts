import { usePostAnnouncementMutation } from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { useLazyGetDepartmentDropdownQuery } from '@/services/airServices/tickets';
import { useLazyGetUsersDropdownListQuery } from '@/services/airServices/settings/user-management/departments';
import {
  createAddAnnouncementDataArray,
  createAddAnnouncementDefaultValues,
  createAddAnnouncementValidationSchema,
} from './AddAnnouncement.data';

export const useAddAnnouncement = (props: any) => {
  const { setIsDrawerOpen } = props;
  const methods: any = useForm({
    resolver: yupResolver(createAddAnnouncementValidationSchema),
    defaultValues: createAddAnnouncementDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [postAnnouncementTrigger, postAnnouncementStatus] =
    usePostAnnouncementMutation();
  const submit = async (data: any) => {
    try {
      const notifyMembers = !!data?.notifyMembers;
      const payload = {
        title: data?.title,
        description: data?.description,
        managedById: data?.managedById?._id,
        vibilityId: data?.vibilityId?._id,
        notifyMembers: notifyMembers,
        additionalEmail: data?.additionalEmail,
        addMembers: data?.addMembers,
        startDate: new Date(data?.startDate)?.toISOString(),
        endDate: new Date(data?.endDate)?.toISOString(),
      };
      const postAnnouncementParameter = {
        body: payload,
      };

      await postAnnouncementTrigger(postAnnouncementParameter)?.unwrap();
      successSnackbar('Announcements added successfully.');
      setIsDrawerOpen(false);
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsDrawerOpen(false);
    reset?.();
  };

  const departmentDropdown = useLazyGetDepartmentDropdownQuery();
  const userDropdown = useLazyGetUsersDropdownListQuery();
  const createAddAnnouncementFormFields = createAddAnnouncementDataArray(
    departmentDropdown,
    userDropdown,
  );

  return {
    createAddAnnouncementFormFields,
    submit,
    methods,
    handleClose,
    handleSubmit,
    postAnnouncementStatus,
  };
};
