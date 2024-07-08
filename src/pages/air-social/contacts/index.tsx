import { Permissions } from '@/constants/permissions';
import Layout from '@/layout';
import Contacts from '@/modules/airSocial/Contacts';

const ContactPage = () => {
  return <Contacts isSocialContacts={true} />;
};
export default ContactPage;
ContactPage.getLayout = function getLayout(page: any) {
  return (
    <Layout guardRoute permissions={Permissions?.SOCIAL_COMPONENTS_CONTACTS}>
      {page}
    </Layout>
  );
};
