import { useFieldArray } from 'react-hook-form';

const useItemsDetails = (props: any) => {
  const { control, vendorId, watch } = props;
  const { fields, append } = useFieldArray({
    control,
    name: 'purchaseDetails',
  });

  return {
    fields,
    append,
    vendorId,
    watch,
  };
};
export default useItemsDetails;
