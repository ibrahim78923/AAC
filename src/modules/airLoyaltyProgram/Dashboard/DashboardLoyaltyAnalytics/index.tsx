import React from 'react';
import { CardsWrapper } from '../CardsWrapper';

import { CustomChart } from '@/components/Chart';
import useDashboardLoyaltyAnalytics from './useDashboardLoyaltyAnalytics';

const DashboardLoyaltyAnalytics = () => {
  const { loyaltyAnalyticOptions, loyaltyAnalyticsData, contentHeight } =
    useDashboardLoyaltyAnalytics();
  return (
    <>
      <CardsWrapper title="LOYALTY ANALYTICS">
        <CustomChart
          options={loyaltyAnalyticOptions}
          series={loyaltyAnalyticsData}
          type="bar"
          height={contentHeight}
        />
      </CardsWrapper>
    </>
  );
};

export default DashboardLoyaltyAnalytics;
