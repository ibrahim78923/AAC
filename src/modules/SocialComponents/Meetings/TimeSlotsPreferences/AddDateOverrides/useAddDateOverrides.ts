import { useFieldArray } from 'react-hook-form';

export const useAddDateOverrides = () => {
  const { fields, remove, append } = useFieldArray({
    name: 'dateOverrides',
  });

  const addDateOverride = () => {
    append({ startHour: new Date(), endHour: new Date() });
  };

  return {
    fields,
    remove,
    addDateOverride,
  };
};
