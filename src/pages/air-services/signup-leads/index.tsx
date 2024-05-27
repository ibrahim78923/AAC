import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import SignUpLeads from '@/modules/airServices/SignUpLeads';

const SignUpLeadsPage = () => {
  return <SignUpLeads />;
};

SignUpLeadsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout permissions={Permissions?.AIR_SERVICES_SIGNUP_LEADS}>{page}</Layout>
  );
};

export default SignUpLeadsPage;
