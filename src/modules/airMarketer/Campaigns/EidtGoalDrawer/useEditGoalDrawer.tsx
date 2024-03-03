import { useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
const useEditGoalDrawer = () => {
  const theme = useTheme();

  const onSubmit = async () => {
    enqueueSnackbar(' Compaign Goal updated Successfully', {
      variant: 'success',
    });
  };
  const toolTipTitle = (val: any) => {
    switch (val) {
      case 'sessions':
        return 'Track traffic to campaign pages with Air Applecart tracking code, including websites,landing pages, and blogs. Note: Inactivity of 30 minutes starts a new session.';
      case 'newContacts':
        return 'First touch contacts are attributed to the campaign that brought them to your website for the first time.';
      case 'influencedContacts':
        return 'The count of fresh or pre-existing connections that interacted with one or multiple resources within this campaign, such as exploring a blog post or opening an email.';
      case 'closedDeals':
        return 'New or influenced contacts contributing to deals, not necessarily exclusive to this campaign.';
      case 'influencedRevenue':
        return 'Total revenue generated from all successfully closed deals, which may not be specific to this campaign.';
      default:
        return 'default';
    }
  };
  return {
    theme,
    toolTipTitle,
    onSubmit,
  };
};
export default useEditGoalDrawer;
