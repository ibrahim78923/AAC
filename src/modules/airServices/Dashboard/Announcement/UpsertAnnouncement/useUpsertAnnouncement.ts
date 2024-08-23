import {
  useGetSingleAnnouncementOnDashboardQuery,
  useLazyGetUsersDropdownListForDashboardQuery,
  usePostAnnouncementMutation,
  useSendServiceDashboardViaEmailOnceMutation,
  useUpdateServicesAnnouncementOnDashboardMutation,
} from '@/services/airServices/dashboard';
import {
  errorSnackbar,
  filteredEmptyValues,
  successSnackbar,
} from '@/utils/api';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, useWatch } from 'react-hook-form';

import {
  DATE_DIFFERENCE,
  upsertAnnouncementDefaultValues,
  upsertAnnouncementFormFieldsDynamic,
  upsertAnnouncementValidationSchema,
} from './UpsertAnnouncement.data';
import { useEffect } from 'react';
import { AutocompleteAsyncOptionsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { AnnouncementPortalComponentsPropsI } from '../Announcement.interface';
import { DATE_FORMAT } from '@/constants';
import dayjs from 'dayjs';
import { ARRAY_INDEX } from '@/constants/strings';

export const useUpsertAnnouncement = (
  props: AnnouncementPortalComponentsPropsI,
) => {
  const { setIsPortalOpen, isPortalOpen, getSingleDashboardData } = props;

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

  const [
    sendServiceDashboardViaEmailOnceTrigger,
    sendServiceDashboardViaEmailOnceStatus,
  ] = useSendServiceDashboardViaEmailOnceMutation();

  const sendEmailOnce = async (formData: any) => {
    const emailFormData = new FormData();
    emailFormData?.append('recipients', formData?.additionalEmail);
    emailFormData?.append('subject', 'New Announcement');
    emailFormData?.append(
      'html',
      `${formData?.title} <br/> ${formData?.description}`,
    );

    const apiDataParameter = {
      body: emailFormData,
    };

    try {
      await sendServiceDashboardViaEmailOnceTrigger(apiDataParameter)?.unwrap();
      successSnackbar('Email sent successfully');
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

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

    const filterEmptyValues = filteredEmptyValues?.(data);

    const payload = {
      ...filterEmptyValues,
      visibility: filterEmptyValues?.visibility?._id,
      notifyMembers: !!filterEmptyValues?.notifyMembers,
      additionalEmail: filterEmptyValues?.additionalEmail,
      addMember: filterEmptyValues?.addMember?.map(
        (item: AutocompleteAsyncOptionsI) => item?._id,
      ),
      startDate: dayjs(new Date(data?.startDate))?.format(DATE_FORMAT?.API),
      endDate: dayjs(new Date(data?.endDate))?.format(DATE_FORMAT?.API),
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
      if (!!filterEmptyValues?.additionalEmail?.length) {
        await sendEmailOnce?.(filterEmptyValues);
      }
      successSnackbar('Announcements added successfully.');
      handleClose?.();
      await getSingleDashboardData?.();
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

      if (!!formData?.additionalEmail?.length) {
        await sendEmailOnce?.(formData);
      }
      successSnackbar('Announcements updated successfully.');
      handleClose?.();
      await getSingleDashboardData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const handleClose = () => {
    setIsPortalOpen({});
    reset?.();
  };

  const visibilityWatch = useWatch({
    control,
    name: 'visibility',
    defaultValue: null,
  });

  useEffect(() => {
    reset(() =>
      upsertAnnouncementDefaultValues(data?.data?.[ARRAY_INDEX?.ZERO]),
    );
  }, [data, reset]);

  const apiQueryUsers = useLazyGetUsersDropdownListForDashboardQuery();
  const upsertAnnouncementFormFields = upsertAnnouncementFormFieldsDynamic(
    apiQueryUsers,
    startDateWatch,
    visibilityWatch,
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
    sendServiceDashboardViaEmailOnceStatus,
  };
};
