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
import { ANNOUNCEMENTS_VISIBILITY, ARRAY_INDEX } from '@/constants/strings';
import useAuth from '@/hooks/useAuth';

export const useUpsertAnnouncement = (
  props: AnnouncementPortalComponentsPropsI,
) => {
  const { setIsPortalOpen, isPortalOpen, getSingleDashboardData } = props;
  const auth: any = useAuth();
  const { _id: productId } = auth?.product;

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
    emailFormData?.append('recipients', formData?.recipients);
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
  const emailsRecipients = (emailRecipientsData: any) => {
    const addMembersEmail =
      emailRecipientsData?.visibility?._id ===
        ANNOUNCEMENTS_VISIBILITY?.SPECIFIC_USERS &&
      !!emailRecipientsData?.notifyMembers
        ? emailRecipientsData?.addMember?.map(
            (member: AutocompleteAsyncOptionsI) => member?.email,
          )
        : [];
    const additionalEmailMembers = emailRecipientsData?.additionalEmail ?? [];
    const additionalEmails = [...additionalEmailMembers, ...addMembersEmail];
    const emailFormData = {
      ...emailRecipientsData,
      recipients: additionalEmails,
    };
    return emailFormData;
  };

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
      productId,
    };

    if (isPortalOpen?.data?._id) {
      updateAnnouncementSubmit?.(payload, filterEmptyValues);
      return;
    }

    const apiDataParameter = {
      body: payload,
    };

    try {
      await postAnnouncementTrigger(apiDataParameter)?.unwrap();
      const emailFormData = emailsRecipients?.(filterEmptyValues);
      if (!!emailFormData?.recipients?.length)
        await sendEmailOnce?.(emailFormData);
      successSnackbar('Announcements added successfully.');
      handleClose?.();
      await getSingleDashboardData?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };

  const updateAnnouncementSubmit = async (
    formData: any,
    filterEmptyValues: any,
  ) => {
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
      const emailFormData = emailsRecipients?.(filterEmptyValues);
      if (!!emailFormData?.recipients?.length)
        await sendEmailOnce?.(emailFormData);
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
