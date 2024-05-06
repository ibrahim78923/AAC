import { useEffect } from 'react';

export const useRecurring = (props: any) => {
  const { watch, setValue } = props;
  const watchAllDay = watch('allDay');
  const watchFromDate = watch('startDate');
  const watchToDate = watch('endDate');
  const watchRecurring = watch('recurring');
  const watchRecurringType = watch('recurringType');
  const watchDailyType = watch('dailyType');
  const watchMonthType = watch('monthType');
  const fromDate = new Date(watchFromDate);
  const toDate = new Date(watchToDate);
  const isSameDate = fromDate?.toDateString() === toDate?.toDateString();
  useEffect(() => {
    setValue('recurring', false);
  }, [isSameDate]);
  const differenceInDays = Math?.abs(
    (toDate?.getTime() - fromDate?.getTime()) / (1000 * 3600 * 24),
  );
  return {
    watchAllDay,
    isSameDate,
    watchRecurring,
    differenceInDays,
    watchRecurringType,
    watchDailyType,
    watchMonthType,
  };
};
