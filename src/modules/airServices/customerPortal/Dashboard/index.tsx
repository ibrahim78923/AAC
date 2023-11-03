import { Grid } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Header } from './Header';
import { WelcomeCard } from './WelcomeCard';
import {
  dashboardWidgets,
  ticketsData,
  ticketsTypeList,
} from './Dashboard.data';
import { useDashboard } from './useDashboard';

const Dashboard = () => {
  const { handleViewMore } = useDashboard();
  return (
    <>
      <Header />
      <br />
      <WelcomeCard
        ticketsData={ticketsData}
        ticketsTypeList={ticketsTypeList}
      />
      <br />
      <Grid container rowSpacing={1.6} columnSpacing={2.4}>
        {dashboardWidgets?.map((element: any) => (
          <Grid key={uuidv4()} item xs={12} {...element?.componentProps}>
            <element.component
              data={element?.data}
              handleViewMore={handleViewMore}
              title={element?.title}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Dashboard;
