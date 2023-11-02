import { Grid, Box } from '@mui/material';
import NoData from '@/components/NoData';
import { v4 as uuidv4 } from 'uuid';
import { NoAssociationFound } from '@/assets/images';
import { Timeline } from './Timeline';
import { contractHistoryData } from './ContractHistory.data';
// import { ExportButton } from '@/modules/airServices/common/Buttons/ExportButton';
export const ContractHistory = () => {
  return (
    <>
      {/* <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={1.25}
        marginBottom={1.5}
      >
        <Box></Box>
        <ExportButton />
      </Box> */}
      <Box></Box>
      <br />
      <Grid container>
        <Grid item xs={12} md={0.5}></Grid>
        <Grid item xs={12} md={10.5}>
          {!!contractHistoryData?.length ? (
            contractHistoryData?.map((singleActivity: any) => (
              <Timeline data={singleActivity} key={uuidv4()} />
            ))
          ) : (
            <NoData
              image={NoAssociationFound}
              message={'There is no activity'}
            />
          )}
        </Grid>
        <Grid item xs={12} md={1}></Grid>
      </Grid>
    </>
  );
  // return <ContractHistoryDetails />;
};
