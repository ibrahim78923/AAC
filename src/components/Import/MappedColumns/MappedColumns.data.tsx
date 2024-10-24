import { RHFAutocomplete, RHFTextField } from '@/components/ReactHookForm';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const mappedColumns = ['File columns', 'CRM Columns', 'Action'];

export const mappedColumnsFormFieldsFunction = (
  name: any,
  index: any,
  remove: any,
  crmColumnsOptions: any,
  mandatoryColumnsList: any,
  fields: any,
) => {
  return [
    {
      id: 1,
      data: (
        <RHFTextField
          disabled
          name={`${name}.${index}.csvColumn`}
          size="small"
        />
      ),
    },
    {
      id: 2,
      data: (
        <RHFAutocomplete
          name={`${name}.${index}.crmColumn`}
          size="small"
          options={crmColumnsOptions}
          fullWidth
          sx={{ minWidth: '15rem' }}
          getOptionLabel={(option: any) => option?.label}
        />
      ),
    },
    {
      id: 6,
      data: (
        <IconButton
          onClick={() => remove(index)}
          sx={{ cursor: 'pointer' }}
          color="error"
          disabled={
            fields?.length <= mandatoryColumnsList?.length ? true : false
          }
        >
          <Delete />
        </IconButton>
      ),
    },
  ];
};
