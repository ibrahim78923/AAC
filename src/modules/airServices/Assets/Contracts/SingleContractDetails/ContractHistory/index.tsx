import { Grid } from '@mui/material';
import NoData from '@/components/NoData';
import { NoAssociationFoundImage } from '@/assets/images';
import { Timeline } from './Timeline';
import { useContractHistory } from './useContractHistory';

export const ContractHistory = () => {
  const { contractHistory } = useContractHistory();
  return (
    <Grid container>
      <Grid item xs={12} md={0.5}></Grid>
      <Grid item xs={12} md={10.5}>
        {!!contractHistory?.length ? (
          contractHistory?.map((singleActivity: any) => (
            <Timeline data={singleActivity} key={singleActivity?._id} />
          ))
        ) : (
          <NoData
            image={NoAssociationFoundImage}
            message={'There is no activity'}
          />
        )}
      </Grid>
      <Grid item xs={12} md={1}></Grid>
    </Grid>
  );
};
