import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
const ThirdStep = () => {
  return (
    <Box pt={2}>
      <Typography fontWeight={600}>Select Gift Card Shop</Typography>
      <br />
      <RHFAutocomplete
        name="shop"
        label="Shop"
        size="small"
        placeholder="Select"
        options={[]}
      />
    </Box>
  );
};

export default ThirdStep;
