import { useFieldArray } from 'react-hook-form';

const useItemsDetails = (props: any) => {
  const { control, vendorId } = props;
  const { fields, append } = useFieldArray({
    control,
    name: 'purchaseDetails',
  });

  return {
    fields,
    append,
    vendorId,
  };
};
export default useItemsDetails;
