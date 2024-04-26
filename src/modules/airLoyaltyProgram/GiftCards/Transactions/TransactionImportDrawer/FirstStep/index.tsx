import { RHFFileImport } from '@/components/ReactHookForm';
import { Box, Typography } from '@mui/material';
const FirstStep = () => {
  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Upload File
      </Typography>
      <Box my={2.4}>
        <RHFFileImport name="product" label="Product" size="small" />
      </Box>
    </>
  );
};

export default FirstStep;
