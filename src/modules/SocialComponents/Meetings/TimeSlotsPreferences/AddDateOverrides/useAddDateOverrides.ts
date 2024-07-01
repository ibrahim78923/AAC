import { useFieldArray } from 'react-hook-form';

export const useAddDateOverrides = (props: any) => {
  const { control } = props;

  const { fields } = useFieldArray({
    name: `dateOverrides`,
    control,
  });

  return {
    fields,
  };
};
