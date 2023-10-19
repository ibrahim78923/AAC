import AssetHead from '../../PurchaseOrders/SinglePurchaseOrderDetails/AssetHead';
import { SinglePurchaseOrderDetailTabs } from './components/SinglePurchaseOrderDetailTabs';

export const SinglePurchaseOrderDetail = () => {
  return (
    <>
      <>
        <AssetHead title=" Dell Purchase Order Details " />
      </>
      <SinglePurchaseOrderDetailTabs />
    </>
  );
};
