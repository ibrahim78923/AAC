import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { Delete } from '@mui/icons-material';

export const mappedColumns = ['File columns', 'CRM Columns', 'Action'];

export const mappedColumnsFormFieldsFunction = (
  name: any,
  index: any,
  remove: any,
) => [
  {
    id: 1,
    data: (
      <RHFTextField disabled name={`${name}.${index}.csvColumn`} size="small" />
    ),
  },
  {
    id: 2,
    data: (
      <RHFAutocomplete
        name={`${name}.${index}.crmColumn`}
        size="small"
        options={[]}
        fullWidth
        sx={{ minWidth: '7rem' }}
        getOptionLabel={(option: any) => option?.label}
      />
    ),
  },
  {
    id: 6,
    data: (
      <Delete
        onClick={() => remove(index)}
        sx={{ cursor: 'pointer' }}
        color="error"
      />
    ),
  },
];
