import {
  useGetSingleAnnouncementOnDashboardQuery,
  useLazyGetUsersDropdownListForDashboardQuery,
  usePostAnnouncementMutation,
  useUpdateServicesAnnouncementOnDashboardMutation,
} from '@/services/airServices/dashboard';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';

import {
  DATE_DIFFERENCE,
  upsertAnnouncementDefaultValues,
  upsertAnnouncementFormFieldsDynamic,
  upsertAnnouncementValidationSchema,
} from './UpsertAnnouncement.data';
import { useEffect } from 'react';

export const useUpsertAnnouncement = (props: any) => {
  const { setIsPortalOpen, isPortalOpen } = props;

  const methods: any = useForm({
    resolver: yupResolver(upsertAnnouncementValidationSchema),
    defaultValues: upsertAnnouncementDefaultValues?.(),
  });
  const { handleSubmit, reset, control } = methods;

  const [postAnnouncementTrigger, postAnnouncementStatus] =
    usePostAnnouncementMutation();

  const [
    updateServicesAnnouncementOnDashboardTrigger,
    updateServicesAnnouncementOnDashboardStatus,
  ] = useUpdateServicesAnnouncementOnDashboardMutation();
  const apiDataParameter = {
    queryParams: {
      id: isPortalOpen?.data?._id,
    },
  };
  const { data, isLoading, isFetching, isError, refetch } =
    useGetSingleAnnouncementOnDashboardQuery?.(apiDataParameter, {
      refetchOnMountOrArgChange: true,
      skip: !isPortalOpen?.data?._id,
    });

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
      vibilityId: data?.visibility?._id,
      notifyMembers: notifyMembers,
      additionalEmail: data?.additionalEmail,
      addMembers: data?.addMembers,
      startDate: new Date(data?.startDate)?.toISOString(),
      endDate: new Date(data?.endDate)?.toISOString(),
    };
    if (isPortalOpen?.data?._id) {
      updateAnnouncementSubmit?.(payload);
      return;
    }

    const apiDataParameter = {
      body: payload,
    };

    try {
      await postAnnouncementTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Announcements added successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateAnnouncementSubmit = async (formData: any) => {
    const payload = {
      ...formData,
    };

    const apiDataParameter = {
      queryParams: {
        id: isPortalOpen?.data?._id,
      },
      body: payload,
    };

    try {
      await updateServicesAnnouncementOnDashboardTrigger(
        apiDataParameter,
      )?.unwrap();
      successSnackbar('Announcements updated successfully.');
      handleClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsPortalOpen({});
    reset?.();
  };

  const visibiltyWatch = useWatch({
    control,
    name: 'visibility',
    defaultValue: null,
  });

  useEffect(() => {
    reset(() => upsertAnnouncementDefaultValues(data?.data));
  }, [data, reset]);

  const apiQueryUsers = useLazyGetUsersDropdownListForDashboardQuery();
  const upsertAnnouncementFormFields = upsertAnnouncementFormFieldsDynamic(
    apiQueryUsers,
    startDateWatch,
    visibiltyWatch,
  );

  return {
    upsertAnnouncementFormFields,
    submit,
    methods,
    handleClose,
    handleSubmit,
    postAnnouncementStatus,
    updateServicesAnnouncementOnDashboardStatus,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
};
