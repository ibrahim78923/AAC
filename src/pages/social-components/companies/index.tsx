import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Companies from '@/modules/SocialComponents/Companies';

const CompaniesPage = () => {
  return <Companies />;
};
export default CompaniesPage;
CompaniesPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_COMPANIES}>
      {page}
    </Layout>
  );
};
