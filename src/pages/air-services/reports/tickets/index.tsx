import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { TicketsReports } from '@/modules/airServices/ServicesTickets/TicketsReports';

const TicketsPage = () => {
  return <TicketsReports />;
};

export default TicketsPage;

TicketsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SETTINGS_USER_MANAGEMENT}>
      {page}
    </Layout>
  );
};
