import { RHFTextField } from '@/components/ReactHookForm';
import { TruncateText } from '@/components/TruncateText';
import { Typography } from '@mui/material';
import * as Yup from 'yup';

export const addItemValidationSchemaOne = Yup?.object()?.shape({
  receivedItem: Yup?.array()?.of(
    Yup?.object()
      ?.shape({
        itemName: Yup?.string(),
        received: Yup?.number()
          ?.typeError('Must be a number')
          ?.nullable()
          ?.required('Required'),
        quantity: Yup?.string(),
        pending: Yup?.string(),
      })
      ?.nullable(),
  ),
});

export const addItemDefaultValuesFunction = (data: any) => {
  return {
    receivedItem: !!data?.data?.purchaseDetails?.length
      ? data?.data?.purchaseDetails?.map((item: any) => ({
          itemName: item?.name ?? '',
          received: null,
          quantity: item?.quantity ?? '',
          pending: item?.quantity ?? '',
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
  'Item Name',
  'Received',
  'Quantity',
  'Pending',
];

export const itemDetailFormFieldsFunction = (
  control: any,
  name: any,
  fields: any,
  index: any,
) => {
  const item = fields?.[index];
  return [
    {
      id: 1,
      data: <TruncateText text={item?.itemName} size={10} />,
    },
    {
      id: 2,
      data: (
        <RHFTextField
          name={`${name}.${index}.received`}
          required
          control={control}
          size="small"
          placeholder="Enter Received"
        />
      ),
    },
    {
      id: 3,
      data: <Typography variant="body3">{item?.quantity}</Typography>,
    },
    {
      id: 4,
      data: <Typography variant="body3">{item?.pending}</Typography>,
    },
  ];
};
