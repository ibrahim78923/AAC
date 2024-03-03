import { Typography } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import CommonTabs from '@/components/Tabs';
import AddCampaigns from './AdCampaigns';
import CTAs from './CTAs';

const Settings = ({ closeAddAssets, isOpenAddAssets }: any) => {
  return (
    <CommonModal
      title={<Typography variant="h3">Add Assets</Typography>}
      open={isOpenAddAssets}
      handleCancel={closeAddAssets}
      okText="Apply"
      cancelText="cancel"
      footer
    >
      <Typography variant="h4">Settings</Typography>
      <CommonTabs
        tabsArray={['Ad Campaigns', 'CTAs', 'Emails', 'Forms', 'Social Posts']}
        tabStyle={'vertical'}
      >
        <AddCampaigns />
        <CTAs />
      </CommonTabs>
    </CommonModal>
  );
};
export default Settings;
