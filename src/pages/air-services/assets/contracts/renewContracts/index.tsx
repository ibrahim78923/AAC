import Layout from '@/layout';
import { ContractsRenew } from '@/modules/airServices/Assets/Contracts/SingleContractDetails/components/Header/contractsRenew/ContractsRenew';

import React from 'react';

const index = () => {
  return (
    <>
      <ContractsRenew />
    </>
  );
};

// export default index;
index.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default index;
