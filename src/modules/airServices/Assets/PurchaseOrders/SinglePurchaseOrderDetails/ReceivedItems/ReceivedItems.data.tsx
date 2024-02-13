import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import { useWatch } from 'react-hook-form';
import * as Yup from 'yup';
export const addItemValidationSchemaOne = Yup?.object()?.shape({
  itemName: Yup?.string(),
  received: Yup?.number(),
  quantity: Yup?.string(),
  pending: Yup?.string(),
});

export const addItemDefaultValuesFunction = (data: any) => {
  return {
    test: [
      {
        itemName: data?.data?.purchaseDetails?.[0]?.itemName ?? '',
        received: null,
        quantity: data?.data?.purchaseDetails?.[0]?.quantity ?? '',
        pending: data?.data?.purchaseDetails?.[0]?.quantity ?? '',
        ...data,
      },
    ],
  };
};

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
