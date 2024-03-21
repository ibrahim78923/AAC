import { Box, Typography } from '@mui/material';
import { stepsColumn } from './ThirdStep.data';
import TanstackTable from '@/components/Table/TanstackTable';
const ThirdStep = (props: any) => {
  const { csvFileData, importLog, handleImportTable } = props;

  return (
    <>
      <Typography fontWeight={600} color="custom.main" pt={1.6}>
        Map Columns from your file to the right CRM fields. Your 5 unmapped
        columns won’t be imported
      </Typography>
      <Box mt={1.6} height={'70vh'} overflow={'scroll'}>
        <TanstackTable
          columns={stepsColumn(importLog, handleImportTable)}
          data={csvFileData}
        />
      </Box>
    </>
  );
};

export default ThirdStep;
