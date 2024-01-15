import { Grid, useTheme } from '@mui/material';
import { DashboardTableCard } from './DashboardTableCard';
import {
  dashboardCardsData,
  loyaltyAnalyticsData,
  loyaltyAnalyticsDataOptions,
} from './Dashboard.data';
import { CustomChart } from '@/components/Chart';
import { CardsWrapper } from './CardsWrapper';
import { Widget } from './Widget';
import Header from './Header';
import DashboardTopUser from './DashboardTopUser';

export const Dashboard = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Header />
        </Grid>

        <Grid item xs={12}>
          <Widget />
        </Grid>

        <Grid item xs={12}>
          <CardsWrapper title="LOYALTY ANALYTICS">
            <CustomChart
              options={loyaltyAnalyticsDataOptions(theme)}
              series={loyaltyAnalyticsData}
              type="bar"
              height={348}
            />
          </CardsWrapper>
        </Grid>

        <Grid item xs={12}>
          <DashboardTopUser />
        </Grid>

        {dashboardCardsData?.map((card) => (
          <Grid item xl={4} md={6} xs={12} key={card?.id}>
            <DashboardTableCard
              tableColumns={card?.tableColumns}
              tableData={card?.tableData}
              href={card?.href}
              title={card?.title}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
