import TanstackTable from '@/components/Table/TanstackTable';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { useDashboardTopUser } from './useDashboardTopUser';
import Card from '@mui/material/Card';
const DashboardTopUser = () => {
  const { dashboardTopUserColumns, data } = useDashboardTopUser();
  return (
    <Card>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        mt={2}
        mr={2}
        ml={2}
      >
        <Typography variant="h5">Top User</Typography>
        <Button>View All</Button>
      </Box>
      <TanstackTable
        data={data}
        columns={dashboardTopUserColumns}
        isPagination
      />
    </Card>
  );
};

export default DashboardTopUser;
