import { CustomButton } from '@/components/Buttons/CustomButton';
import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { ARRAY_INDEX } from '@/constants/strings';

export const itemDetailColumns = [
  { _id: 'Service Name *', label: 'Service Name *' },
  { _id: 'Price Model *', label: 'Price Model *' },
  { _id: 'Cost *', label: 'Cost *' },
  { _id: 'Count *', label: 'Count *' },
  { _id: 'Comments', label: 'Comments' },
  { _id: 'Action', label: 'Action' },
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
    ),
  },
  {
    id: 2,
    data: (
      <RHFAutocomplete
        name={`${name}.${index}.priceModel`}
        size="small"
        options={priceModelOptions}
        isOptionEqualToValue={(option: any, newValue: any) =>
          option === newValue
        }
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
      <CustomButton
        variant="text"
        hasIcon={false}
        type="button"
        disabled={index === ARRAY_INDEX?.ZERO}
        onClick={() => remove(index)}
      >
        Delete
      </CustomButton>
    ),
  },
];
