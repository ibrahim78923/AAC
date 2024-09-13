import { TIME_UNITS } from '@/constants/strings';
import { errorSnackbar } from '@/utils/api';
import { useFieldArray } from 'react-hook-form';

export const useReminder = (props: any) => {
  const { control, watch } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reminder',
  });
  const handleAppend = () => {
    if (fields?.length >= 5) {
      return errorSnackbar('Reminder limit exceeds');
    }
    return append({ type: null, counter: '', duration: null });
  };
  const handleRemove = (index: number) => {
    if (fields?.length === 1) {
      return errorSnackbar('Set at least one reminder');
    }
    remove(index);
  };
  const watchFromDate = watch('startDate');
  const watchToDate = watch('endDate');
  const watchTime = watch('startTime');
  const watchTimeEnd = watch('endTime');

  const fromDate = new Date(watchFromDate);
  const toDate = new Date(watchToDate);

  const startTime = new Date(watchTime);
  const endTime = new Date(watchTimeEnd);

  const differenceInDays = Math?.abs(
    (toDate?.getTime() - fromDate?.getTime()) /
      (TIME_UNITS?.MS * TIME_UNITS?.SEC_PER_HOUR * TIME_UNITS?.HOURS_PER_DAY),
  );

  const differenceInMinutes = Math.abs(
    (endTime?.getTime() - startTime?.getTime()) /
      (TIME_UNITS?.MS * TIME_UNITS?.SEC_PER_MINUTE),
  );

  return {
    fields,
    handleAppend,
    handleRemove,
    differenceInDays,
    differenceInMinutes,
  };
};
