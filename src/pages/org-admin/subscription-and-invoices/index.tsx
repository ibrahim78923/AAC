import Layout from '@/layout';
import SubscriptionAndInvoices from '@/modules/orgAdmin/SubscriptionAndInvoices';

function SubscriptionAndInvoicesPage() {
  return (
    <>
      <SubscriptionAndInvoices />
    </>
  );
}

export default SubscriptionAndInvoicesPage;
SubscriptionAndInvoicesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
