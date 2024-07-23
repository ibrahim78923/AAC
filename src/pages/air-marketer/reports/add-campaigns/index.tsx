import Layout from '@/layout';
import AdsCampaigns from '@/modules/airMarketer/Reports/AdsCampaigns';
import React from 'react';
import { Permissions } from '@/constants/permissions';

const AddCampaignsPage = () => {
  return (
    <Layout permissions={Permissions?.AIR_MARKETER_REPORTS}>
      <AdsCampaigns />
    </Layout>
  );
};

export default AddCampaignsPage;
