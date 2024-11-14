import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Card, Stack } from '@mui/material';
import { performanceColumns, performanceData } from './CTAs.data';

const CTAs = () => {
  return (
    <Card sx={{ padding: '18px 27px' }}>
      <Stack gap={3}>
        <Search size="small" placeholder="Search Here" width={260} />
        <Box>
          <TanstackTable columns={performanceColumns} data={performanceData} />
          <Button size="small">Create ad</Button>
        </Box>
      </Stack>
    </Card>
  );
};

export default CTAs;
