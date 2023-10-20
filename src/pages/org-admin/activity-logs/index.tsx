import Layout from '@/layout';
import ActivityLogsSection from '@/modules/orgAdmin/ActivityLogs';
import React from 'react';

const ActivityLogs = () => {
  return <ActivityLogsSection />;
};

export default ActivityLogs;

ActivityLogs.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
