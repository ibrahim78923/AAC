import Link from 'next/link';

import { Box, Button, Grid, Typography, useTheme } from '@mui/material';

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
import { useRouter } from 'next/router';
import { ArrowBackIcon, RestoreIcon } from '@/assets/icons';
import { AIR_SOCIAL } from '@/routesConstants/paths';
import useDetails from './Details/useDetails';
const ContactViewDetails = () => {
  const router = useRouter();
  const contactId = router?.query?.contactId;
  const theme = useTheme();
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

              <Link
                href={`${AIR_SOCIAL?.CONTACTS}/${contactId}/${AIR_SOCIAL?.RESTORE_ACTIVITIES}`}
              >
                <Button
                  variant="outlined"
                  sx={{ height: '30px', color: theme?.palette?.custom['main'] }}
                  startIcon={<RestoreIcon />}
                >
                  Restore Activities
                </Button>
              </Link>
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
              <Emails />
            </HorizontalTabs>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactViewDetails;
