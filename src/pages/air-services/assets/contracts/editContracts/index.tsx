import Layout from '@/layout';
import { ContractsEdit } from '@/modules/airServices/Assets/Contracts/SingleContractDetails/components/Header/ContractsEdit/ContractsEdit';

import React from 'react';

const index = () => {
  return (
    <>
      <ContractsEdit />
    </>
  );
};

// export default index;
index.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default index;
