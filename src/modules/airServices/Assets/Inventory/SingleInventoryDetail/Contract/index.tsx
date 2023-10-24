import NoData from '@/components/NoData';
import { Grid, Typography, useTheme } from '@mui/material';
import NoContractFound from '@/assets/images/modules/LogitechMouse/Contract.png';
import { contractData } from './Contract.data';
import { Card } from '@/modules/airServices/common/Card';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './Contract.style';

export const Contract = () => {
  const theme: any = useTheme();
  return (
    <Grid container>
      <Grid item xs={12} md={12} xl={12}>
        {!!contractData?.length ? (
          contractData?.map((singleContract: any) => (
            <Card
              heading={singleContract.heading}
              status={singleContract.status}
              key={uuidv4()}
              show={true}
            >
              <Typography sx={styles.spanStyle(theme)}>
                {singleContract.body}
              </Typography>
            </Card>
          ))
        ) : (
          <NoData
            image={NoContractFound}
            message={'There are no active contract available'}
          />
        )}
      </Grid>
    </Grid>
  );
};
