import { useFieldArray } from 'react-hook-form';

export const useAddDateOverrides = () => {
  const { fields, remove, append } = useFieldArray({
    name: 'overrides',
  });

  const addDateOverride = () => {
    append({ start: null, end: null });
  };

  return {
    fields,
    remove,
    addDateOverride,
  };
};
