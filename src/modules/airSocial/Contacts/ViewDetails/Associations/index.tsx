import { Box, Grid, Typography } from '@mui/material';

import Attachments from './Attachments';
import Companies from './Companies';
import Tickets from './Tickets';
import Deal from './Deal';

import { styles } from '../ViewDetails.style';
// import useAssociations from './useAssociations';

const Associations = ({ contactId }: any) => {
  return (
    <Box sx={styles?.horizontalTabsBox}>
      <Typography variant="h4">Associations </Typography>
      <Box sx={styles?.horizontalTabsInnnerBox}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Tickets contactId={contactId} />
          </Grid>

          <Grid item xs={12}>
            <Deal contactId={contactId} />
          </Grid>

          <Grid item xs={12}>
            <Companies contactId={contactId} />
          </Grid>

          <Grid item xs={12}>
            <Attachments contactId={contactId} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Associations;
