import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  useGetTimeSlotsQuery,
  usePostTimeSlotsMutation,
} from '@/services/commonFeatures/meetings';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/constants';
import { timeSlotsDefaultValues } from './TimeSlotsPreferences.data';

export const useTimeSlotPreferences = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(true);
  const [timeSlotsState, setTimeSlotsState] = useState<any[]>([]);
  const [daySlotsState, setDaySlotsState] = useState<any[]>([]);
  const [submittedOverrideData, setSubmittedOverrideData] = useState<any>([]);

  const { data, isLoading, isFetching }: any = useGetTimeSlotsQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const timeSlotsData = data?.data;

  const methods = useForm({
    defaultValues: timeSlotsDefaultValues(timeSlotsData),
  });

  const { handleSubmit, watch, setValue, reset } = methods;
  useEffect(() => {
    reset(timeSlotsDefaultValues(timeSlotsData));
  }, [reset, timeSlotsData]);

  const watchMonths = watch('months');
  const [selectedMonths, setSelectedMonths] = useState<any[]>(watchMonths);
  useEffect(() => {
    setSelectedMonths(watchMonths);
  }, [watchMonths]);

  const [postTimeSlotsTrigger, timeSlotsProcess] = usePostTimeSlotsMutation();

  const formattedOverrides = submittedOverrideData?.dateOverrides?.map(
    (override: any) => {
      const uniqueTimeRanges = new Set(
        override?.timeRanges?.map((range: any) => {
          const formattedRange = {
            startHour: dayjs(range?.startHour)?.format(TIME_FORMAT?.TH),
            endHour: dayjs(range?.endHour)?.format(TIME_FORMAT?.TH),
          };
          return JSON?.stringify(formattedRange);
        }) as unknown[],
      );
      const uniqueTimeRangesArray = Array?.from(uniqueTimeRanges)?.map(
        (value: unknown) => JSON?.parse(value as string),
      );
      return {
        date: override?.date,
        timeRanges: uniqueTimeRangesArray,
      };
    },
  );

  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      months: selectedMonths,
      dateOverrides: formattedOverrides,
      bufferTime: {
        bufferBefore: data?.bufferTime?.bufferBefore?.value,
        bufferAfter: data?.bufferTime?.bufferAfter?.value,
      },
    };
    try {
      await postTimeSlotsTrigger({ body })?.unwrap();
      successSnackbar('Added Weekly Hours Successfully');
      setDisabled(true);
    } catch (err) {
      errorSnackbar();
    }
  };

  return {
    methods,
    disabled,
    setDisabled,
    theme,
    onSubmit,
    handleSubmit,
    watch,
    setValue,
    selectedMonths,
    setSelectedMonths,
    timeSlotsState,
    setTimeSlotsState,
    daySlotsState,
    setDaySlotsState,
    submittedOverrideData,
    setSubmittedOverrideData,
    timeSlotsProcess,
    timeSlotsData,
    isLoading,
    isFetching,
  };
};
