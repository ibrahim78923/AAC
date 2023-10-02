import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import SubscriptionInvoices from '@/modules/SubscriptionInvoices';

function SubscriptionInvoicesPage() {
  return (
    <>
      <SubscriptionInvoices />
    </>
  );
}

export default SubscriptionInvoicesPage;
SubscriptionInvoicesPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
