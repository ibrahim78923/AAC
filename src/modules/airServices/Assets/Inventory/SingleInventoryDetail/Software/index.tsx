import NoData from '@/components/NoData';
import { Grid } from '@mui/material';
import NoSoftwareFound from '@/assets/images/modules/LogitechMouse/Expense.png';
import { softwareData } from './software.data';
import Card from '@/modules/airServices/common/card';
import { v4 as uuidv4 } from 'uuid';

export const Software = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={12} xl={12}>
        {!!softwareData?.length ? (
          softwareData?.map((singleSoftware: any) => (
            <Card
              heading={singleSoftware.heading}
              status={singleSoftware.status}
              key={uuidv4()}
            />
          ))
        ) : (
          <NoData image={NoSoftwareFound} message={'No Software found'} />
        )}
      </Grid>
    </Grid>
  );
};
