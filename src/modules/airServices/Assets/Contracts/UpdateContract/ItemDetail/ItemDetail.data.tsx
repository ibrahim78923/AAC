import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export const itemDetailColumns = [
  'Service Name',
  'Price Model',
  'Cost',
  'Count',
  'Comments',
  'Action',
];

export const priceModelOptions = [
  {
    label: 'One time',
    value: 'One time',
  },
  {
    label: 'Fixed',
    value: 'fixed',
  },
  {
    label: 'Per unit',
    value: 'per unit',
  },
];
export const itemDetailFormFieldsFunction = (
  name: any,
  index: any,
  remove: any,
) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.serviceName`} size="small" />, //TODO: exceptional case for RHF FieldArray
  },
  {
    id: 2,
    data: (
      <RHFSelect name={`${name}.${index}.priceModel`} size="small">
        {priceModelOptions?.map((option: any) => (
          <option key={uuidv4()} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </RHFSelect>
    ),
  },
  {
    id: 3,
    data: <RHFTextField name={`${name}.${index}.cost`} size="small" />,
  },
  {
    id: 4,
    data: <RHFTextField name={`${name}.${index}.count`} size="small" />,
  },
  {
    id: 5,
    data: <RHFTextField name={`${name}.${index}.comments`} size="small" />,
  },
  {
    id: 6,
    data: (
      <Button type="button" onClick={() => remove(index)}>
        Delete
      </Button>
    ),
  },
];
