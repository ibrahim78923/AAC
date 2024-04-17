import { useTheme } from '@mui/material';
import {
  loyaltyAnalyticsData,
  loyaltyAnalyticsDataOptions,
} from './DashboardLoyaltyAnalytics.data';

const useDashboardLoyaltyAnalytics = () => {
  const contentHeight = 348;
  const theme = useTheme();
  const loyaltyAnalyticOptions = loyaltyAnalyticsDataOptions(theme);
  return {
    loyaltyAnalyticOptions,
    loyaltyAnalyticsData,
    contentHeight,
    theme,
  };
};

export default useDashboardLoyaltyAnalytics;
