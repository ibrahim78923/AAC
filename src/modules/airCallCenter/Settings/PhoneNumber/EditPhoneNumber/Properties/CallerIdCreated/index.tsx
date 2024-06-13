import CommonModal from '@/components/CommonModal';

import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

const CallerIdCreated = (props: any) => {
  const { callerIDCreated, setCallerIDCreated } = props;

  return (
    <CommonModal
      open={callerIDCreated}
      handleClose={() => setCallerIDCreated(false)}
      handleSubmit={() => setCallerIDCreated(false)}
      title="Caller ID Created"
      okText="Close"
      footer
    >
      <Grid item xs={12}>
        <Box display="flex" flexDirection={'column'} gap={2}>
          <Typography variant="body1">423 4 13 1454</Typography>
          <Typography variant="body1">
            Henceforth, whenever you make an outgoing call, your customers will
            see the caller id instead of your business phone number
          </Typography>
        </Box>
      </Grid>
    </CommonModal>
  );
};

export default CallerIdCreated;
