import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Card, Stack } from '@mui/material';
import { performanceColumns, performanceData } from './AdCampaigns.data';

const AddCampaigns = () => {
  return (
    <Card sx={{ padding: '18px 27px' }}>
      <Stack gap={3}>
        <Search size="small" placeholder="Search Here" width={260} />
        <TanstackTable columns={performanceColumns} data={performanceData} />
      </Stack>
    </Card>
  );
};

export default AddCampaigns;
