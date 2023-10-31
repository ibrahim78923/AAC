import SuperAdminLayout from '@/layout/index';
import { Activities } from '@/modules/airServices/ServicesTickets/SingleTicketDetail/Activities';
import { Box } from '@mui/material';

const TestComponentsZainPage = () => {
  return (
    <Box>
      <Activities />
    </Box>
  );
};

TestComponentsZainPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentsZainPage;
