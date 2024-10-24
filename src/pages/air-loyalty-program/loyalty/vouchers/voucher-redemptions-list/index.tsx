import { AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS } from '@/constants/permission-keys';
import Layout from '@/layout';
import { VoucherRedemptionsList } from '@/modules/airLoyaltyProgram/Loyalty/Vouchers/VoucherRedemptionsList';

const VoucherRedemptionsListPage = () => <VoucherRedemptionsList />;

export default VoucherRedemptionsListPage;

VoucherRedemptionsListPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={[AIR_LOYALTY_PROGRAM_VOUCHERS_PERMISSIONS?.VIEW_DETAILS]}
    >
      {page}
    </Layout>
  );
};
