import SuperAdminLayout from '@/layout/index';
import { Box } from '@mui/material';

const TestComponentsZainPage = () => {
  return (
    <>
      <>
        <Box sx={{ display: 'flex', gap: 1 }}></Box>
      </>
    </>
  );
};
TestComponentsZainPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentsZainPage;
