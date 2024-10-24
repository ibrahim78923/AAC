import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';

export const GetTierAttributeListDropdown = (props: any) => {
  const { options, clearErrors, setValue } = props;
  return (
    <RHFAutocomplete
      name="attribute"
      label="Attribute"
      placeholder="Select attribute"
      required
      size="small"
      options={options}
      getOptionLabel={(option: any) => option?.label}
      isOptionEqualToValue={(option: any, value: any) =>
        option?._id === value?._id
      }
      onChangeHandler={() => {
        setValue('operator', null);
        setValue('fieldValue', '');
        setValue('contacts', []);
        clearErrors(['operator', 'fieldValue', 'contacts']);
      }}
      renderOption={(props: any, option: any) => {
        return (
          <li {...props} key={option?._id}>
            <Box width={'100%'}>
              <Typography
                variant={'body2'}
                color={'grey.600'}
                fontWeight={'fontWeightSmall'}
              >
                {option?.label}
              </Typography>
              <Typography variant={'body3'} color={'grey.600'}>
                {option?.description}
              </Typography>
            </Box>
          </li>
        );
      }}
    />
  );
};
