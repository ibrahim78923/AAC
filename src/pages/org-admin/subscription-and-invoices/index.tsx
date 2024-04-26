import { Permissions } from '@/constants/permissions';
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
  return (
    <Layout
      guardRoute
      permissions={Permissions?.ORG_ADMIN_SUBSCRIPTION_AND_INVOICE}
    >
      {page}
    </Layout>
  );
};
