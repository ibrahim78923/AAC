import React from 'react';
import Layout from '@/layout';
import CreateTemplate from '@/modules/airMarketer/SMSMarketing/Templates/CreateTemplate';
import { Permissions } from '@/constants/permissions';

const AirMarketerSMSMarketingCreateTemplatePage = () => {
  return <CreateTemplate />;
};

export default AirMarketerSMSMarketingCreateTemplatePage;

AirMarketerSMSMarketingCreateTemplatePage.getLayout = function getLayout(
  page: any,
) {
  return (
    <Layout
      permissions={
        Permissions.AIR_MARKETER_SMS_MARKETING_CREATE_TEMPLATE_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
