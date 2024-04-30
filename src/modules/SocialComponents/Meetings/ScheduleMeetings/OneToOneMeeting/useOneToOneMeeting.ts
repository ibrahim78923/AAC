import { SOCIAL_COMPONENTS } from '@/constants';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { allDayValues, oneToOneDefaultValues } from './OneToOneMeeting.data';
import { useEffect } from 'react';

export const useOneToOneMeeting = () => {
  const methods = useForm({
    defaultValues: oneToOneDefaultValues,
  });
  const { handleSubmit, watch, setValue, control } = methods;
  const onSubmit = async () => {};
  const router = useRouter();
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
  const meetingProps = { watch, control, setValue };
  return { methods, handleSubmit, onSubmit, handleMoveBack, meetingProps };
};
