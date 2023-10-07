import TicketDetaile from '@/modules/TicketDeatilsView';
import React from 'react';
import Layout from '@/layout';

export const UseTicketViewDetailPage = () => {
  return (
    <>
      <TicketDetaile />
    </>
  );
};

// export default UseTicketViewDetailPage;
UseTicketViewDetailPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
export default UseTicketViewDetailPage;
