import Layout from '@/layout';
import { Permissions } from '@/constants/permissions';
import TemplateForm from '@/modules/airMarketer/WhatsAppMarketing/WhatsAppMarketingComponent/Templates/TemplateForm';

const TemplateFormPage = () => {
  return <TemplateForm />;
};

export default TemplateFormPage;

TemplateFormPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions.AIR_MARKETER_WHATSAPP_MARKETING_CREATE_TEMPLATE_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
