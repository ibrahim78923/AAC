import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  allDayValues,
  meetingTitle,
  upsertMeetingSchema,
  upsertMeetingValues,
} from './UpsertMeeting.data';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { successSnackbar } from '@/utils/api';

export const useUpsertMeeting = () => {
  const methods = useForm({
    defaultValues: upsertMeetingValues(),
    resolver: yupResolver(upsertMeetingSchema),
  });
  const { handleSubmit, watch, setValue, control } = methods;
  const router: any = useRouter();
  const meetingType = meetingTitle?.[router?.query?.type];
  const onSubmit = async () => {
    successSnackbar(`${meetingType} Meeting created successfully`);
  };
  const handleMoveBack = () => {
    router?.push(SOCIAL_COMPONENTS?.SCHEDULE_MEETING);
  };
  const watchAllDay = watch('allDay');
  const watchMeetingType = watch('meetingType');
  const watchBefore = watch('bufferBefore');
  const watchAfter = watch('bufferAfter');
  useEffect(() => {
    allDayValues?.forEach((item: any) => setValue(item?.name, item?.value));
  }, [watchAllDay]);
  useEffect(() => {
    setValue('location', '');
  }, [watchMeetingType]);
  useEffect(() => {
    setValue('bufferBeforeTime', '');
  }, [watchBefore]);
  useEffect(() => {
    setValue('bufferAfterTime', '');
  }, [watchAfter]);
  const meetingProps = { watch, control, setValue, meetingType };
  return {
    methods,
    handleSubmit,
    onSubmit,
    handleMoveBack,
    meetingProps,
    meetingType,
  };
};
