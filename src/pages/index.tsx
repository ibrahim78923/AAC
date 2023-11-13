import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import { Login } from '@/modules/airCustomerPortal/Login';

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
Home.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions.view_dashoard}>
      {page}
    </Layout>
  );
};
