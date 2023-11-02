import React from 'react';
import Layout from '@/layout';

import Catalog from '@/modules/airServices/CustomerPortal/Catalog';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      {/* <SingleTicketDetail />; */}
      <Catalog />
    </>
  );
};

//export default UseTicketViewDetailPage;
UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
