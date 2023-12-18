import { TextField, useTheme } from '@mui/material';

const CrmField = ({ options }: any) => {
  const { mandatoryFields, optionalFields } = options;
  const { palette } = useTheme();
  return (
    <TextField size="small" select fullWidth SelectProps={{ native: true }}>
      <>
        <option
          disabled
          value=""
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: palette?.slateBlue?.main,
            padding: '0.5rem !important',
          }}
        >
          Mandatory Fields
        </option>
        {mandatoryFields?.map((option: any) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
        <option disabled value="" style={{ height: 10 }}></option>
        <option
          disabled
          value=""
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: palette?.blue?.light,
          }}
        >
          Optional Fields
        </option>
        {optionalFields?.map((option: any) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </>
    </TextField>
  );
};

export default CrmField;
