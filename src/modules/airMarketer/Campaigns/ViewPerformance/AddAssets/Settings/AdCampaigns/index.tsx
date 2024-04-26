import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Card, Stack } from '@mui/material';
import React from 'react';
import { performanceColumns, performanceData } from './AdCampaigns.data';

const AddCampaigns = () => {
  return (
    <Card sx={{ padding: '20px' }}>
      <Stack gap={1}>
        <Search size="small" placeholder="Search Here" />
        <TanstackTable columns={performanceColumns} data={performanceData} />
      </Stack>
    </Card>
  );
};

export default AddCampaigns;
