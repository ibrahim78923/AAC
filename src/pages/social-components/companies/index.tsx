import Layout from '@/layout';
import Companies from '@/modules/SocialComponents/Companies';

const CompaniesPage = () => {
  return <Companies />;
};
export default CompaniesPage;
CompaniesPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_COMPANIES}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
