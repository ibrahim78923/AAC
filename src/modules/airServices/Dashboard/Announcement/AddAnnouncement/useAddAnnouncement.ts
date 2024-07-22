import {
  useLazyGetDepartmentsDropdownListForDashboardQuery,
  useLazyGetUsersDropdownListForDashboardQuery,
  usePostAnnouncementMutation,
} from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import {
  createAddAnnouncementDataArray,
  createAddAnnouncementDefaultValues,
  createAddAnnouncementValidationSchema,
} from './AddAnnouncement.data';
import useAuth from '@/hooks/useAuth';

export const useAddAnnouncement = (props: any) => {
  const { setIsPortalOpen } = props;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

  const methods: any = useForm({
    resolver: yupResolver(createAddAnnouncementValidationSchema),
    defaultValues: createAddAnnouncementDefaultValues,
  });
  const { handleSubmit, reset } = methods;

  const [postAnnouncementTrigger, postAnnouncementStatus] =
    usePostAnnouncementMutation();

  const submit = async (data: any) => {
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
    productId,
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
