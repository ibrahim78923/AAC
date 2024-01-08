import { useFieldArray } from 'react-hook-form';

const useItemsDetails = (props: any) => {
  const { control } = props;
  const { fields, append } = useFieldArray({
    control,
    name: 'purchaseDetails',
  });

  return {
    fields,
    append,
  };
};
export default useItemsDetails;
