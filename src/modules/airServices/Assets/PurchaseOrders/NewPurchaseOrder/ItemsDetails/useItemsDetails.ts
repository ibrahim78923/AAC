import { useFieldArray } from 'react-hook-form';

const useItemsDetails = (props: any) => {
  const { control, vendorId, watch, name } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return {
    fields,
    append,
    vendorId,
    watch,
    remove,
    control,
  };
};

export default useItemsDetails;
