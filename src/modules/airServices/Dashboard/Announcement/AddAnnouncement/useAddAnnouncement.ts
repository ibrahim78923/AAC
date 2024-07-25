import {
  useLazyGetDepartmentsDropdownListForDashboardQuery,
  useLazyGetUsersDropdownListForDashboardQuery,
  usePostAnnouncementMutation,
} from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';

import {
  createAddAnnouncementDataArray,
  createAddAnnouncementDefaultValues,
  createAddAnnouncementValidationSchema,
  DATE_DIFFERENCE,
} from './AddAnnouncement.data';

export const useAddAnnouncement = (props: any) => {
  const { setIsPortalOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(createAddAnnouncementValidationSchema),
    defaultValues: createAddAnnouncementDefaultValues,
  });
  const { handleSubmit, reset, control } = methods;

  const [postAnnouncementTrigger, postAnnouncementStatus] =
    usePostAnnouncementMutation();

  const startDateWatch = useWatch({
    control,
    name: 'startDate',
    defaultValue: null,
  });

  const submit = async (data: any) => {
    if (!!data?.endDate) {
      const dateDifference = data?.endDate - data?.startDate;
      if (dateDifference < DATE_DIFFERENCE?.ZERO)
        return errorSnackbar('End Date should be greater than Start Date');
    }
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
    try {
      await postAnnouncementTrigger(postAnnouncementParameter)?.unwrap();
      successSnackbar('Announcements added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsPortalOpen({});
    reset?.();
  };

  const departmentDropdown =
    useLazyGetDepartmentsDropdownListForDashboardQuery();
  const userDropdown = useLazyGetUsersDropdownListForDashboardQuery();
  const createAddAnnouncementFormFields = createAddAnnouncementDataArray(
    departmentDropdown,
    userDropdown,
    startDateWatch,
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
