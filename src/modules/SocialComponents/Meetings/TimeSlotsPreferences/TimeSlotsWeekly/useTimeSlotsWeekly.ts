import { useFieldArray } from 'react-hook-form';

export const useTimeSlotsWeekly = (props: any) => {
  const { control } = props;
  const { fields } = useFieldArray({
    name: 'daysTimeRanges',
    control,
  });

  return {
    fields,
  };
};
