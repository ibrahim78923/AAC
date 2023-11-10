import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';

export default function Home() {
  return <div>fdfdff</div>;
}
Home.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions.view_dashoard}>
      {page}
    </Layout>
  );
};
