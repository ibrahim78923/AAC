import {
  DeleteIcon,
  GoogleCalenderIcon,
  OfficeCalenderIcon,
} from '@/assets/icons';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { SOCIAL_COMPONENTS } from '@/constants';
import { Box, Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GOOGLEACCOUNTS } from '../CalendarIntegration.data';

export const ViewAccounts = () => {
  const router = useRouter();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <PageTitledHeader
            canMovedBack
            title={'Connected Calendars'}
            moveBack={() => router?.push(SOCIAL_COMPONENTS?.MEETINGS_SETTINGS)}
          >
            <Button
              disableElevation
              variant="contained"
              LinkComponent={Link}
              href={`${SOCIAL_COMPONENTS?.MEETINGS_SETTINGS}`}
            >
              Connect another account
            </Button>
          </PageTitledHeader>
        </Grid>
        <Grid item xs={12}>
          <Box
            border="1px solid"
            borderColor="grey.700"
            borderRadius={2}
            marginTop="2rem"
            p={2}
          >
            <Box>
              <Typography variant="formTopHeading" color="secondary.main">
                My calendar Account
              </Typography>
            </Box>
            <Box>
              <Grid container mt={2}>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    pb={1}
                    borderBottom="1px solid"
                    borderColor="grey.700"
                  >
                    <Box display="flex" alignItems="center">
                      <Box
                        display="flex"
                        alignItems="center"
                        mr={1}
                        sx={{ scale: '1.2' }}
                      >
                        {router?.query?.viewAccounts === GOOGLEACCOUNTS ? (
                          <GoogleCalenderIcon />
                        ) : (
                          <OfficeCalenderIcon />
                        )}
                      </Box>
                      <Box>
                        <Typography
                          variant="formTopHeading"
                          color="slateBlue.main"
                          fontWeight={500}
                        >
                          {router?.query?.viewAccounts === GOOGLEACCOUNTS
                            ? 'Google Calendar'
                            : 'Office 365 Calendar'}
                        </Typography>
                        <Box>
                          <Typography variant="body3" color="custom.main">
                            Rabilibra275@gmail.com
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ scale: '1.5', cursor: 'pointer' }} pt={1.5}>
                      <DeleteIcon />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
