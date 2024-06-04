import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Typography } from '@mui/material';
import { tabelColumn } from './Table.data';
import { EditGreyIcon } from '@/assets/icons';

export const Table = ({ tableTitle, setAddProperties, columnsData }: any) => {
  return (
    <>
      <Box boxShadow={2} p={2} borderRadius={2}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h6">{tableTitle}</Typography>
          <Box
            display={'flex'}
            alignItems={'center'}
            gap={1}
            sx={{ cursor: 'pointer' }}
            onClick={() => setAddProperties(true)}
          >
            <EditGreyIcon />
            <Typography variant="h6">Edit Properties</Typography>
          </Box>
        </Box>
        <Box mt={2}>
          <TanstackTable data={{}} columns={tabelColumn(columnsData)} />
        </Box>
      </Box>
    </>
  );
};
