import Header from '../../PurchaseOrders/SinglePurchaseOrderDetails/Header';
import { SinglePurchaseOrderDetailTabs } from './components/SinglePurchaseOrderDetailTabs';
export const SinglePurchaseOrderDetail = () => {
  return (
    <>
      <>
        <Header title="Dell Purchase Order Details" />
      </>
      <SinglePurchaseOrderDetailTabs />
    </>
  );
};
