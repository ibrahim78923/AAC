import Accordion from '@/components/Accordion';
import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';

function SuperAdminPage() {
  return (
    <div>
      <Accordion />
    </div>
  );
}
export default SuperAdminPage;
SuperAdminPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
