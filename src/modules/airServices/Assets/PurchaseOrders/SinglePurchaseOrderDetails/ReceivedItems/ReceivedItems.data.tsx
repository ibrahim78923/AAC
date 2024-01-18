import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';

export const itemDetail = [
  {
    itemName: 'Product A',
    received: '10',
    quantity: '20',
    pending: '10',
  },

  // Add more items as needed
];
export const itemDetailColumns = [
  'itemName',
  'received',
  'quantity',
  'pending',
];
export const itemDetailFormFieldsFunction = (
  control: any,
  name: any,
  index: any,
) => {
  const quantityValue = useWatch({
    control,
    name: `${name}.${index}.quantity`,
  });
  const itemName = useWatch({ control, name: `${name}.${index}.itemName` });
  const pendingValue = useWatch({ control, name: `${name}.${index}.pending` });
  return [
    {
      id: 1,
      data: <Typography variant="body1">{itemName}</Typography>,
    },
    {
      id: 2,
      data: (
        <RHFTextField
          name={`${name}.${index}.received`}
          control={control}
          size="small"
        />
      ),
    },
    {
      id: 3,
      data: <Typography variant="body1">{quantityValue}</Typography>,
    },
    {
      id: 4,
      data: <Typography variant="body1">{pendingValue}</Typography>,
    },
  ];
};
