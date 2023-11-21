import Layout from '@/layout';
import Companies from '@/modules/SocialComponents/Companies';

const CompaniesPage = () => {
  return <Companies />;
};
export default CompaniesPage;
CompaniesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
