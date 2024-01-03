import Layout from '@/layout';
import Contacts from '@/modules/airSocial/Contacts';

const ContactPage = () => {
  return <Contacts />;
};
export default ContactPage;
ContactPage.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
