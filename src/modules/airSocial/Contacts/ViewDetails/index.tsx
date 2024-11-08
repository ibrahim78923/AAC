import Link from 'next/link';
import { Box, Grid, Typography } from '@mui/material';
import HorizontalTabs from '@/components/Tabs/HorizontalTabs';
import Details from './Details';
import ActivityLog from './ActivityLog';
import Tasks from './Tasks';
import Notes from './Notes';
import Calls from './Calls';
import Emails from './Emails';
import Meetings from './Meetings';
import Associations from './Associations';
import { singleUserDealTabsData } from './ViewDetails.data';
import { ArrowBackIcon } from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import useDetails from './Details/useDetails';
import useViewDetails from './useViewDetails';

const ContactViewDetails = () => {
  const { contactId } = useViewDetails();

  const { contactName } = useDetails();

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link href={AIR_SOCIAL?.CONTACTS}>
              <ArrowBackIcon />
            </Link>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h4">{contactName()}</Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <HorizontalTabs tabsDataArray={singleUserDealTabsData}>
              <Details />
              <ActivityLog contactId={contactId} />
              <Associations contactId={contactId} />
              <Tasks contactId={contactId} />
              <Notes contactId={contactId} />
              <Calls contactId={contactId} />
              <Meetings />
              <Emails contactId={contactId} />
            </HorizontalTabs>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactViewDetails;
