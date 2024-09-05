import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import SubscriptionAndInvoices from '@/modules/orgAdmin/SubscriptionAndInvoices';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
function SubscriptionAndInvoicesPage() {
  const stripePromise = loadStripe(
    'pk_test_51P8JP9JCPibbsexaJz0iE0TadRlb5fvb9MnBSWqrkMtzxWFaEtu8Q6nVDTQcUEeOmEQqVTXKkxL9r4igMPVDootM006wSHq2YL',
  );
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionAndInvoices />
    </Elements>
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
