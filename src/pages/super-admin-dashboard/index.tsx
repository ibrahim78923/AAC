import AccordionItem from '@/components/Accordion';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import { Card } from '@mui/material';

function SuperAdminPage() {
  // return <div>Admin Dashboard</div>;
  return (
    <div>
      <AccordionItem title="Prepare">
        <Card sx={{ height: '200px', bgcolor: 'red', width: '100%' }}></Card>
      </AccordionItem>
    </div>
  );
}
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
