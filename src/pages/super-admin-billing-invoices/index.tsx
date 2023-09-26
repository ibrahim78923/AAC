import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import BillingAndInvoicesTable from '@/modules/BillingAndInvoices/BillingAndInvoicesTable';
function BillingInvoicesPage() {
  return <BillingAndInvoicesTable />;
}
export default BillingInvoicesPage;
BillingInvoicesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
