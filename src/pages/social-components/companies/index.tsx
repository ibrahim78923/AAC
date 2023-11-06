import Layout from '@/layout';
import SocialCompanies from '@/modules/SocialComponents/Companies';

const CompaniesPage = () => {
  return <SocialCompanies />;
};
export default CompaniesPage;
CompaniesPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
