import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
function BillingInvoicesPage() {
  return <div>Billing and Invoices Page</div>;
}
export default BillingInvoicesPage;
BillingInvoicesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
