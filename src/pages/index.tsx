import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import SignUp from '@/modules/airCustomerPortal/Login';

export default function Home() {
  return <SignUp />;
}
Home.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions.view_dashoard}>
      {page}
    </Layout>
  );
};
