import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Vouchers } from '@/modules/airLoyaltyProgram/Loyalty/Vouchers';

const VouchersPage = () => <Vouchers />;

export default VouchersPage;

VouchersPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_LOYALTY_PROGRAM_VOUCHERS}>
      {page}
    </Layout>
  );
};
