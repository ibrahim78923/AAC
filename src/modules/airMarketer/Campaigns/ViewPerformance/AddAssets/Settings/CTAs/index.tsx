import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Card, Stack } from '@mui/material';
import { performanceColumns, performanceData } from './CTAs.data';

const CTAs = () => {
  return (
    <Card sx={{ padding: '20px' }}>
      <Stack gap={1}>
        <Search size="small" placeholder="Search Here" />
        <Box>
          <TanstackTable columns={performanceColumns} data={performanceData} />
          <Button size="small">Create ad</Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default CTAs;
