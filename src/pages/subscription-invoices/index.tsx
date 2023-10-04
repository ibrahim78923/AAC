import Layout from '@/layout';
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
  return <Layout>{page}</Layout>;
};
