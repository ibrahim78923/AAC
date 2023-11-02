import React from 'react';
import Layout from '@/layout';

import { SingleTicketDetail } from '@/modules/airServices/ServicesTickets/SingleTicketDetail';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      <SingleTicketDetail />;
    </>
  );
};

//export default UseTicketViewDetailPage;
UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
