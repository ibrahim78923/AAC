import Layout from '@/layout';
import { Vouchers } from '@/modules/airLoyaltyProgram/Loyalty/Vouchers';

const VouchersPage = () => <Vouchers />;

export default VouchersPage;

VouchersPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
