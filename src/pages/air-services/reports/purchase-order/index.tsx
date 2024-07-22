import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { PurchaseOrdersReports } from '@/modules/airServices/Assets/PurchaseOrders/PurchaseOrdersReports';

const PurchaseOrdersReportsPage = () => {
  return <PurchaseOrdersReports />;
};

export default PurchaseOrdersReportsPage;

PurchaseOrdersReportsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_PURCHASE_ORDER_TICKETS}>
      {page}
    </Layout>
  );
};
