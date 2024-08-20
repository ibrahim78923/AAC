import Layout from '@/layout';
import Contacts from '@/modules/airSocial/Contacts';

const ContactPage = () => {
  return <Contacts />;
};
export default ContactPage;
ContactPage.getLayout = function getLayout(page: any) {
  return (
    // permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}
    <Layout guardRoute variant="common">
      {page}
    </Layout>
  );
};
