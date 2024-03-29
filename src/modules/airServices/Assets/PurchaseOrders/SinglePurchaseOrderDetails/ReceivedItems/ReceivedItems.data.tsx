import { RHFTextField } from '@/components/ReactHookForm';
import { Typography } from '@mui/material';
import * as Yup from 'yup';
export const addItemValidationSchemaOne = Yup?.object()?.shape({
  receivedItem: Yup?.array()?.of(
    Yup?.object()?.shape({
      itemName: Yup?.string(),
      received: Yup?.number()?.required('Required'),
      quantity: Yup?.string(),
      pending: Yup?.string(),
    }),
  ),
});

export const addItemDefaultValuesFunction = (data: any) => {
  return {
    receivedItem: !!data?.data?.purchaseDetails?.length
      ? data?.data?.purchaseDetails?.map((x: any) => ({
          itemName: x?.itemName ?? '',
          received: null,
          quantity: x?.quantity ?? '',
          pending: x?.quantity ?? '',
          ...data,
        }))
      : [
          {
            itemName: '',
            received: null,
            quantity: '',
            pending: '',
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
  fields: any,
  index: any,
) => {
  const item = fields[index];
  return [
    {
      id: 1,
      data: <Typography variant="body1">{item?.itemName}</Typography>,
    },
    {
      id: 2,
      data: (
        <RHFTextField
          name={`${name}.${index}.received`}
          required
          control={control}
          size="small"
        />
      ),
    },
    {
      id: 3,
      data: <Typography variant="body1">{item?.quantity}</Typography>,
    },
    {
      id: 4,
      data: <Typography variant="body1">{item?.pending}</Typography>,
    },
  ];
};
