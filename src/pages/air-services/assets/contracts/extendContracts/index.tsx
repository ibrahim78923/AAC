import Layout from '@/layout';
import { ContractsExtend } from '@/modules/airServices/Assets/Contracts/SingleContractDetails/components/Header/contractsExtend/ContractsExtend';
// import { ContractsRenew } from '@/modules/airServices/Assets/Contracts/SingleContractDetails/components/Header/contractsRenew/ContractsRenew';

import React from 'react';

const index = () => {
  return (
    <>
      <ContractsExtend />
    </>
  );
};

// export default index;
index.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default index;
