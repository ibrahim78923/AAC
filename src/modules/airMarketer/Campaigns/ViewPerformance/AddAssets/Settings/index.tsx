import { Typography, useMediaQuery, useTheme } from '@mui/material';
import CommonModal from '@/components/CommonModal';
import CommonTabs from '@/components/Tabs';
import AddCampaigns from './AdCampaigns';
import CTAs from './CTAs';

const Settings = ({ closeAddAssets, isOpenAddAssets }: any) => {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme?.breakpoints?.up('md'));
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
        tabStyle={isMdUp ? 'vertical' : 'horizontal'}
      >
        <AddCampaigns />
        <CTAs />
      </CommonTabs>
    </CommonModal>
  );
};
export default Settings;
