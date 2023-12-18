import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Typography } from '@mui/material';
import { stepData, stepsColumn } from './ThirdStep.data';
const ThirdStep = () => {
  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Map Columns from your file to the right CRM fields. Your 5 unmapped
        columns won’t be imported
      </Typography>
      <Box mt={1.6} height={'70vh'} overflow={'scroll'}>
        <TanstackTable columns={stepsColumn} data={stepData} />
      </Box>
    </>
  );
};

export default ThirdStep;
