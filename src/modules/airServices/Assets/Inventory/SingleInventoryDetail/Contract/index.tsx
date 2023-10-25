import NoData from '@/components/NoData';
import { Grid, Typography, useTheme } from '@mui/material';
import NoContractFound from '@/assets/images/modules/LogitechMouse/Contract.png';
import { contractData } from './Contract.data';
import { InventoryCard } from '@/components/InventoryCard/index';
import { v4 as uuidv4 } from 'uuid';

export const Contract = () => {
  const theme: any = useTheme();
  return (
    <Grid container>
      <Grid item xs={12} md={12} xl={12}>
        {!!contractData?.length ? (
          contractData?.map((singleContract: any) => (
            <InventoryCard
              heading={singleContract.heading}
              status={singleContract.status}
              key={uuidv4()}
              show={true}
            >
              <Typography color={theme?.palette?.grey[900]}>
                {singleContract.body}
              </Typography>
            </InventoryCard>
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
