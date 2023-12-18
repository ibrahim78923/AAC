import Layout from '@/layout';
import { VoucherRedemptionsList } from '@/modules/airLoyaltyProgram/Loyalty/Vouchers/VoucherRedemptionsList';
import React from 'react';

const VoucherRedemptionsListPage = () => <VoucherRedemptionsList />;

export default VoucherRedemptionsListPage;

VoucherRedemptionsListPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
