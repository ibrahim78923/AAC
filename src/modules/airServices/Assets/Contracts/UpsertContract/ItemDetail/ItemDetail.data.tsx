import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { Button } from '@mui/material';

export const itemDetailColumns = [
  'Service Name *',
  'Price Model *',
  'Cost *',
  'Count *',
  'Comments',
  'Action',
];
export const priceModelOptions = ['ONE_TIME', 'FIXED', 'PER_UNIT'];
export const itemDetailFormFieldsFunction = (
  name: any,
  index: any,
  remove: any,
) => [
  {
    id: 1,
    data: (
      <RHFTextField
        name={`${name}.${index}.serviceName`}
        size="small"
        placeholder="Enter Service Name"
      />
    ), //TODO: exceptional case for RHF FieldArray
  },
  {
    id: 2,
    data: (
      <RHFAutocomplete
        name={`${name}.${index}.priceModel`}
        size="small"
        options={priceModelOptions}
        fullWidth={true}
        sx={{ minWidth: '12rem' }}
        placeholder="Select Price Model"
      />
    ),
  },
  {
    id: 3,
    data: (
      <RHFTextField
        name={`${name}.${index}.cost`}
        size="small"
        placeholder="Enter Cost"
      />
    ),
  },
  {
    id: 4,
    data: (
      <RHFTextField
        name={`${name}.${index}.count`}
        size="small"
        placeholder="Enter Count"
      />
    ),
  },
  {
    id: 5,
    data: (
      <RHFTextField
        name={`${name}.${index}.comments`}
        size="small"
        placeholder="Comments..."
      />
    ),
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
