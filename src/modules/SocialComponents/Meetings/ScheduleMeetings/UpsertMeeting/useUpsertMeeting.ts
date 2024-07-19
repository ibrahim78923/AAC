import { SOCIAL_COMPONENTS, TIME_FORMAT } from '@/constants';
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
import dayjs from 'dayjs';

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
    onWorkingDay: 'workingDay',
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

  const [addMeetingTrigger, addMeetingProgress] = useAddMeetingMutation();
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
      timeZone: formData?.timeZone?.label,
      startDate: formData?.startDate,
      endDate: formData?.endDate,
      startTime: dayjs(formData?.startTime)?.format(TIME_FORMAT?.TH),
      endTime: dayjs(formData?.endTime)?.format(TIME_FORMAT?.TH),
      type: formData?.meetingType?.value,
      isRecurring: formData?.recurring,
      recurring:
        formData?.recurring === true
          ? {
              type:
                formData?.recurring === true
                  ? formData?.recurringType?.value
                  : '',
              interval:
                formData?.recurringType?.label === recurringConstant?.daily &&
                formData?.dailyType === recurringConstant?.onTheDay &&
                formData?.recurring === true
                  ? formData?.recurringDay
                  : 0,
              isWeekdays:
                formData?.recurringType?.label === recurringConstant?.daily &&
                formData?.monthType === recurringConstant?.onWorkingDay &&
                formData?.recurring === true
                  ? true
                  : formData?.recurringType?.label ===
                      recurringConstant?.monthly &&
                    formData?.monthType === recurringConstant?.onTheDay &&
                    formData?.recurring === true
                  ? true
                  : formData?.recurringType?.label ===
                      recurringConstant?.weekly && formData?.recurring === true
                  ? true
                  : false,
              days:
                formData?.recurringType?.label === recurringConstant?.monthly &&
                formData?.monthType === recurringConstant?.onMonthDate &&
                formData?.recurring === true
                  ? formData?.monthlyDate
                  : [],
              onDay:
                formData?.recurringType?.label === recurringConstant?.weekly
                  ? formData?.weekDays?.map((day: string) => day?.toUpperCase())
                  : formData?.recurringType?.label ===
                      recurringConstant?.monthly &&
                    formData?.monthType === recurringConstant?.onTheDay &&
                    formData?.recurring === true
                  ? formData?.monthlyDays?.map((day: any) => day?.value)
                  : [],
              onWeek:
                formData?.recurringType?.label === recurringConstant?.monthly &&
                formData?.recurring === true
                  ? formData?.monthlyWeeks?.map(
                      (week: string) => week?.toUpperCase(),
                    )
                  : [],
            }
          : {
              days: [],
              onDay: [],
              onWeek: [],
            },
      locationId: formData?.location?._id,
      bufferTime: {
        before: formData?.bufferBeforeTime?.value,
        after: formData?.bufferAfterTime?.value,
      },
      reminders: formData?.reminder?.map((reminder: any) => ({
        type: reminder?.type?.value,
        interval: reminder?.counter,
        timeUnit: reminder?.duration?.value,
      })),
      peoples: [formData?.people?._id],
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
    addMeetingProgress,
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
