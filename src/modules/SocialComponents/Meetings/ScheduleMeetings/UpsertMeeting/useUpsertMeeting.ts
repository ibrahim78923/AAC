import { SOCIAL_COMPONENTS, TIME_FORMAT } from '@/constants';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import {
  meetingTitle,
  schemaTypes,
  upsertMeetingSchema,
  upsertMeetingValues,
} from './UpsertMeeting.data';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useAddMeetingMutation,
  useGetByIdMeetingsListQuery,
  useLazyGetLocationListQuery,
  useUpdateMeetingMutation,
} from '@/services/commonFeatures/meetings';
import dayjs from 'dayjs';
import { MEETINGS_ACTION_TYPE } from '@/constants/strings';

export const useUpsertMeeting = () => {
  const router: any = useRouter();
  const { id: meetingId } = router?.query;
  const moduleId = router?.query?.ticketId;
  const moduleType = router?.query?.moduleType;

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
    location: 'In person meeting',
  };

  const { data, isLoading, isFetching, isError }: any =
    useGetByIdMeetingsListQuery(meetingId, {
      refetchOnMountOrArgChange: true,
      skip: !!!meetingId,
    });

  const meetingData = data?.data;

  const methods = useForm({
    defaultValues: upsertMeetingValues(router, meetingData),
    resolver: yupResolver(upsertMeetingSchema(router)),
  });
  const { handleSubmit, watch, setValue, control, reset } = methods;
  const meetingType = meetingTitle?.[router?.query?.type];

  useEffect(() => {
    if (router?.query?.type) {
      setActiveMeetingType(router?.query?.type);
    }
  }, [router?.query?.type]);

  useEffect(() => {
    reset(upsertMeetingValues(router, meetingData));
  }, [meetingData]);

  const workingDay = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  const [addMeetingTrigger, addMeetingProgress] = useAddMeetingMutation();
  const [updateMeetingTrigger, updateMeetingProgress] =
    useUpdateMeetingMutation();

  const watchMeetingType = watch('meetingType');
  const onSubmit = async (formData: any) => {
    const isRecurringDailyOnTheDay =
      formData?.recurringType?.label === recurringConstant?.daily &&
      formData?.dailyType === recurringConstant?.onTheDay &&
      formData?.recurring === true;

    const isRecurringDailyOnWorkingDay =
      formData?.recurringType?.label === recurringConstant?.daily &&
      formData?.dailyType === recurringConstant?.onWorkingDay &&
      formData?.recurring === true;

    const isRecurringMonthlyOnTheDay =
      formData?.recurringType?.label === recurringConstant?.monthly &&
      formData?.monthType === recurringConstant?.onTheDay &&
      formData?.recurring === true;

    const isRecurringMonthlyOnMonthDate =
      formData?.recurringType?.label === recurringConstant?.monthly &&
      formData?.monthType === recurringConstant?.onMonthDate &&
      formData?.recurring === true;

    const isRecurringWeekly =
      formData?.recurringType?.label === recurringConstant?.weekly &&
      formData?.recurring === true;

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
      startTime:
        formData?.allDay === false
          ? dayjs(formData?.startTime)?.format(TIME_FORMAT?.TH)
          : '',
      endTime:
        formData?.allDay === false
          ? dayjs(formData?.endTime)?.format(TIME_FORMAT?.TH)
          : '',
      type: formData?.meetingType?.value,
      isRecurring: formData?.recurring,
      recurring:
        formData?.recurring === true
          ? {
              type: formData?.recurring ? formData?.recurringType?.value : '',
              interval: isRecurringDailyOnTheDay ? formData?.recurringDay : 0,
              isWeekdays:
                isRecurringDailyOnWorkingDay ||
                isRecurringMonthlyOnTheDay ||
                isRecurringWeekly,
              days: isRecurringMonthlyOnMonthDate ? formData?.monthlyDate : [],
              onDay: isRecurringWeekly
                ? formData?.weekDays?.map((day: any) => day?.toUpperCase())
                : isRecurringMonthlyOnTheDay
                  ? formData?.weekDays?.map((day: any) => day?.toUpperCase())
                  : isRecurringDailyOnWorkingDay
                    ? workingDay
                    : [],
              onWeek: isRecurringMonthlyOnTheDay
                ? formData?.monthlyWeeks?.map(
                    (week: any) => week?.toUpperCase(),
                  )
                : [],
            }
          : {
              days: [],
              onDay: [],
              onWeek: [],
            },
      locationId:
        watchMeetingType?.label === schemaTypes?.inPersonMeeting
          ? formData?.location?._id
          : '',
      bufferTime: {
        before: formData?.bufferBeforeTime?.value,
        after: formData?.bufferAfterTime?.value,
      },
      reminders: formData?.reminder?.map((reminder: any) => ({
        type: reminder?.type?.value,
        interval: reminder?.counter,
        timeUnit: reminder?.duration?.value,
      })),
      peoples:
        router?.query?.type === schemaTypes?.group
          ? formData?.people?.map((item: any) => item?._id)
          : [formData?.people?._id],
      ...(moduleType && { moduleType }),
      ...(moduleId && { moduleId }),
    };

    const meetingParameter = meetingId ? { ...body, id: meetingId } : body;

    try {
      const res: any = meetingId
        ? await updateMeetingTrigger(meetingParameter)?.unwrap()
        : await addMeetingTrigger(meetingParameter)?.unwrap();

      const action = meetingId
        ? MEETINGS_ACTION_TYPE?.UPDATES
        : MEETINGS_ACTION_TYPE?.CREATED;
      successSnackbar(`${meetingType} Meeting ${action} successfully`);

      router?.push({
        pathname: SOCIAL_COMPONENTS?.CREATE_MEETING_TEMPLATE,
        query: {
          ...(moduleId && { ticketId: res?.data?.moduleId }),
          meetingId: res?.data?._id,
        },
      });
    } catch (err: any) {
      errorSnackbar(err?.data?.message);
    }
  };
  const handleTemplatePage = async () => {
    router?.push(SOCIAL_COMPONENTS?.EMAIL_TEMPLATE);
    setMeetingTemplate(true);
  };
  const handleMoveBack = () => {
    router?.push({
      pathname: SOCIAL_COMPONENTS?.SCHEDULE_MEETING,
      query: {
        ...(moduleType && { moduleType }),
        ...(moduleId && { ticketId: moduleId }),
      },
    });
  };

  const watchAllDay = watch('allDay');
  useEffect(() => {
    if (!!watchAllDay) {
      setValue('meetingType', {
        value: 'IN_PERSON_MEETING',
        label: 'In person meeting',
      });
    }
  }, [watchAllDay]);
  const [beforeChecked, setBeforeChecked] = useState(false);
  const [afterChecked, setAfterChecked] = useState(false);

  const handleBeforeChange = (e: any) => {
    const isChecked = e?.target?.checked;
    setBeforeChecked(isChecked);
    if (!isChecked) {
      setValue('bufferBeforeTime', '');
    }
  };

  const handleAfterChange = (e: any) => {
    const isChecked = e?.target?.checked;
    setAfterChecked(isChecked);
    if (!isChecked) {
      setValue('bufferAfterTime', '');
    }
  };

  const meetingLocationApi = useLazyGetLocationListQuery();
  const meetingProps = {
    watch,
    control,
    setValue,
    meetingType,
    setMeetingTemplate,
    meetingLocationApi,
    addMeetingProgress,
    router,
    updateMeetingProgress,
    isLoading,
    isFetching,
    isError,
    beforeChecked,
    afterChecked,
    handleBeforeChange,
    handleAfterChange,
    meetingId,
    meetingData,
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
