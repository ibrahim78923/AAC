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
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAddMeetingMutation,
  useLazyGetLocationListQuery,
} from '@/services/commonFeatures/meetings';

export const useUpsertMeeting = () => {
  const router: any = useRouter();
  const [meetingTemplate, setMeetingTemplate] = useState<boolean>(false);
  const [activeMeetingType, setActiveMeetingType] = useState(
    router?.query?.type || '',
  );

  const recurringConstant = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    onMonthDate: 'onDate',
    onTheDay: 'onThe',
  };

  const routeConstant = {
    oneToOne: 'One to One',
    oneToOneMeeting: 'ONE_TO_ONE',
    group: 'Group',
    groupMeeting: 'GROUP',
    collective: 'Collective',
    collectiveMeeting: 'COLLECTIVE',
  };

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

  const [addMeetingTrigger] = useAddMeetingMutation();
  const onSubmit = async (formData: any) => {
    const body = {
      title: formData?.title,
      agenda: formData?.description,
      category:
        meetingType === routeConstant?.oneToOne
          ? routeConstant?.oneToOneMeeting
          : meetingType === routeConstant?.group
            ? routeConstant?.groupMeeting
            : routeConstant?.collectiveMeeting,
      isAllDay: formData?.allDay,
      timeZone: formData?.timeZone,
      startDate: formData?.startDate,
      endDate: formData?.endDate,
      startTime: formData?.startTime,
      endTime: formData?.endTime,
      type: formData?.meetingType?.value,
      isRecurring: formData?.recurring,
      recurring: {
        type: formData?.recurring === true ? formData?.recurringType : '',
        interval:
          formData?.recurringType === recurringConstant?.daily &&
          formData?.dailyType === recurringConstant?.onTheDay &&
          formData?.recurring === true
            ? formData?.recurringDay
            : '',
        isWeekdays:
          formData?.recurringType === recurringConstant?.daily &&
          formData?.recurring === true
            ? formData?.dailyType
            : formData?.recurringType === recurringConstant?.monthly &&
                formData?.recurring === true
              ? formData?.monthType
              : '',
        days:
          formData?.recurringType === recurringConstant?.monthly &&
          formData?.monthType === recurringConstant?.onMonthDate &&
          formData?.recurring === true
            ? formData?.monthlyDate
            : [],
        onDay:
          formData?.recurringType === recurringConstant?.weekly
            ? formData?.weekDays
            : formData?.recurringType === recurringConstant?.monthly &&
                formData?.monthType === recurringConstant?.onTheDay &&
                formData?.recurring === true
              ? formData?.monthlyDays?.map((day: any) => day?.value)
              : [],
        onWeek:
          formData?.recurringType === recurringConstant?.monthly &&
          formData?.recurring === true
            ? formData?.monthlyWeeks
            : [],
      },
      locationId: formData?.location?._id,
      bufferTime: {
        before: formData?.bufferBeforeTime,
        after: formData?.bufferAfterTime,
      },
      reminders: formData?.reminders?.map((reminder: any) => ({
        type: reminder?.type,
        interval: reminder?.counter,
        timeUnit: reminder?.duration,
      })),
      peoples: formData?.people?._id,
    };
    const meetingParameter = {
      body,
    };
    try {
      await addMeetingTrigger(meetingParameter)?.unwrap();
      successSnackbar(`${meetingType} Meeting created successfully`);
    } catch (err: any) {
      errorSnackbar(err?.data?.message);
    }
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
    setValue('location', null);
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

  const meetingLocationApi = useLazyGetLocationListQuery();
  const meetingProps = {
    watch,
    control,
    setValue,
    meetingType,
    setMeetingTemplate,
    meetingLocationApi,
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
