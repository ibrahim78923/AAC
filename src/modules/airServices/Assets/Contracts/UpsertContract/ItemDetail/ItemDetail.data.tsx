import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { Button } from '@mui/material';

export const columns = [
  'Service Name',
  'Price Model',
  'Cost',
  'Count',
  'Comments',
  'Action',
];
export const priceModelOptions = [
  {
    label: 'one time',
    value: 'one time',
  },
  {
    label: 'fixed',
    value: 'fixed',
  },
  {
    label: 'per unit',
    value: 'per unit',
  },
];
export const tableData = (name: any, index: any, remove: any) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.serviceName`} size="small" />, //TODO: exceptional case for RHF FieldArray
  },
  {
    id: 2,
    data: (
      <RHFSelect
        name={`${name}.${index}.priceModel`}
        // options={dropdownDummy}
        size="small"
      >
        {priceModelOptions?.map((option: any) => (
          <option key={option?.value} value={option?.value}>
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
