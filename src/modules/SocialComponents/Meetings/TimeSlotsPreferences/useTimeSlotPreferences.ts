import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import { defaultValues } from './TimeSlotsPreferences.data';
import { usePostTimeSlotsMutation } from '@/services/commonFeatures/meetings';
import dayjs from 'dayjs';
import { TIME_FORMAT } from '@/constants';

export const useTimeSlotPreferences = () => {
  const theme = useTheme();
  const [disabled, setDisabled] = useState(true);
  const [selectedMonths, setSelectedMonths] = useState<any[]>([]);
  const [timeSlotsState, setTimeSlotsState] = useState<any[]>([]);
  const [daySlotsState, setDaySlotsState] = useState<any[]>([]);
  const [submittedOverrideData, setSubmittedOverrideData] = useState<any>([]);

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, watch, setValue } = methods;
  const [postTimeSlotsTrigger] = usePostTimeSlotsMutation();

  const aggregateTimeRangesByDay = (timeSlotsState: any) => {
    const aggregated: any = {};

    timeSlotsState?.forEach((slot: any) => {
      const { dayName, timeRanges } = slot;

      if (!aggregated[dayName]) {
        aggregated[dayName] = [];
      }
      aggregated[dayName] = aggregated[dayName]?.concat(
        timeRanges?.map((range: any) => ({
          startHour: dayjs(range?.startHour)?.format(TIME_FORMAT?.TH),
          endHour: dayjs(range?.endHour)?.format(TIME_FORMAT?.TH),
        })),
      );
    });

    return Object?.keys(aggregated)?.map((dayName: any) => ({
      days: dayName,
      timeRanges: aggregated[dayName],
    }));
  };

  const formattedOverrides = submittedOverrideData?.map((override: any) => {
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
      date: override?.overrideDate,
      timeRanges: uniqueTimeRangesArray,
    };
  });

  const onSubmit = async () => {
    const aggregatedTimeRanges = aggregateTimeRangesByDay(timeSlotsState);
    const body = {
      months: selectedMonths,
      daysTimeRanges: aggregatedTimeRanges,
      dateOverrides: formattedOverrides,
    };
    try {
      await postTimeSlotsTrigger({ body })?.unwrap();
      successSnackbar('Added Weekly Hours Successfully');
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
  };
};
