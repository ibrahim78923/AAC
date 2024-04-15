import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';

export const mappedColumns = ['File columns', 'impact'];

export const mappedColumnsFormFieldsFunction = (name: any, index: any) => [
  {
    id: 1,
    data: <RHFTextField name={`${name}.${index}.displayName`} size="small" />,
  },
  {
    id: 2,
    data: (
      <RHFAutocomplete
        name={`${name}.${index}.impact`}
        size="small"
        options={[]}
        fullWidth
        sx={{ minWidth: '5rem' }}
        getOptionLabel={(option: any) => option?.label}
      />
    ),
  },
];
