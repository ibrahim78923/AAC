import React from 'react';
import Layout from '@/layout';
import SMSBroadcastDetails from '@/modules/airMarketer/SMSMarketing/SMSBroadcast/SMSBroadcastDetails';
import { Permissions } from '@/constants/permissions';

const AirMarketerSMSBroadcastDetailsPage = () => {
  return <SMSBroadcastDetails />;
};

export default AirMarketerSMSBroadcastDetailsPage;

AirMarketerSMSBroadcastDetailsPage.getLayout = function getLayout(page: any) {
  return (
    <Layout
      permissions={
        Permissions.AIR_MARKETER_SMS_MARKETING_BROADCAST_DETAILS_PERMISSIONS
      }
    >
      {page}
    </Layout>
  );
};
