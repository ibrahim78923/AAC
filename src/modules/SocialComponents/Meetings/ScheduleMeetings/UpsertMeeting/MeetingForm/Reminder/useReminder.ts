import { errorSnackbar } from '@/utils/api';
import { useFieldArray } from 'react-hook-form';

export const useReminder = (props: any) => {
  const { control } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reminder',
  });
  const handleAppend = () => {
    if (fields?.length >= 5) {
      return errorSnackbar('Reminder limit exceeds');
    }
    return append({ type: '', counter: null, duration: '' });
  };
  const handleRemove = (index: number) => {
    if (fields?.length === 1) {
      return errorSnackbar('Set at least one reminder');
    }
    remove(index);
  };
  return {
    fields,
    handleAppend,
    handleRemove,
  };
};
