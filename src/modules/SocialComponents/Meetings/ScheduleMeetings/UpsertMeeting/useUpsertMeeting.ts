import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  allDayValues,
  meetingTitle,
  upsertMeetingSchema,
  upsertMeetingValues,
} from './UpsertMeeting.data';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { successSnackbar } from '@/utils/api';

export const useUpsertMeeting = () => {
  const router: any = useRouter();
  const [meetingTemplate, setMeetingTemplate] = useState<boolean>(false);
  const [activeMeetingType, setActiveMeetingType] = useState(
    router?.query?.type || '',
  );

  const methods = useForm({
    defaultValues: upsertMeetingValues(router),
    resolver: yupResolver(upsertMeetingSchema(router)),
  });
  const { handleSubmit, watch, setValue, control, clearErrors } = methods;
  const meetingType = meetingTitle?.[router?.query?.type];
  useEffect(() => {
    if (router?.query?.type) {
      setActiveMeetingType(router?.query?.type);
    }
  }, [router?.query?.type]);

  const onSubmit = async () => {
    successSnackbar(`${meetingType} Meeting created successfully`);
  };
  const handleTemplatePage = async () => {
    router?.push(SOCIAL_COMPONENTS?.EMAIL_TEMPLATE);
    setMeetingTemplate(true);
  };
  const handleMoveBack = () => {
    router?.push(SOCIAL_COMPONENTS?.SCHEDULE_MEETING);
  };

  const watchAllDay = watch('allDay');
  const watchMeetingType = watch('meetingType');
  const watchBefore = watch('bufferBefore');
  const watchAfter = watch('bufferAfter');
  const watchRecurring = watch('recurring');
  useEffect(() => {
    allDayValues?.forEach((item: any) => setValue(item?.name, item?.value));
  }, [watchAllDay]);
  useEffect(() => {
    setValue('location', '');
  }, [watchMeetingType]);
  useEffect(() => {
    clearErrors(['endDate', 'endTime']);
  }, [watchRecurring]);
  useEffect(() => {
    setValue('bufferBeforeTime', '');
  }, [watchBefore]);
  useEffect(() => {
    setValue('bufferAfterTime', '');
  }, [watchAfter]);

  const meetingProps = {
    watch,
    control,
    setValue,
    meetingType,
    setMeetingTemplate,
  };
  return {
    methods,
    handleSubmit,
    onSubmit,
    handleMoveBack,
    meetingProps,
    meetingType,
    handleTemplatePage,
    meetingTemplate,
    activeMeetingType,
  };
};
