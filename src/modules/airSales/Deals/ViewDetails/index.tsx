import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Box, Grid, Typography, useTheme } from '@mui/material';

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
import { NotesAvatarImage } from '@/assets/images';

import { styles } from './ViewDetails.style';

const ViewDetails = () => {
  const theme = useTheme();
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Link href="/air-sales/deals">
              <ArrowBackIcon />
            </Link>
            <Box>
              <Typography variant="h4">Share My Dine</Typography>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.custom?.main }}
              >
                Amount: £20
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={3}>
          <Box sx={styles.detailsBox}>
            <Box sx={{ display: 'flex', gap: 1, marginBottom: '7px' }}>
              <Image
                src={NotesAvatarImage}
                width={40}
                height={40}
                alt="NotesAvatarImage"
              />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: '600' }}>
                  Olivia Rhye
                </Typography>
                <Typography
                  variant="body3"
                  sx={{ color: theme?.palette?.custom?.main }}
                >
                  Created on Sun, 5 Mar 9:41 PM
                </Typography>
              </Box>
            </Box>
            <hr style={styles?.salesBox} />
            <Box sx={styles?.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Email
              </Typography>
              <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                olivia@gmail.com
              </Typography>
            </Box>
            <Box sx={styles?.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Phone Number
              </Typography>
              <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                +44 063556245
              </Typography>
            </Box>
            <Box sx={styles?.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Deal Type
              </Typography>
              <Typography variant="body3" sx={styles?.salesPriority(theme)}>
                New Business
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box sx={styles.detailsBox}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Products
            </Typography>
            <Box sx={styles?.noproductBox}>
              <Typography
                variant="body3"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                No products to show
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box sx={styles.detailsBox}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Upcoming Meetings
            </Typography>
            <Box sx={styles?.noproductBox}>
              <Typography
                variant="body3"
                sx={{ color: theme?.palette?.grey[900] }}
              >
                No Meeting Found
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <Box sx={styles.detailsBox}>
            <Box sx={styles.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Stage
              </Typography>
              <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                New
              </Typography>
            </Box>
            <Box sx={styles.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Pipeline
              </Typography>
              <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                Sales Pipeline
              </Typography>
            </Box>
            <Box sx={styles.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Priority
              </Typography>
              <Typography variant="body3" sx={styles?.salesPriority(theme)}>
                Low
              </Typography>
            </Box>
            <Box sx={styles.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Created Date
              </Typography>
              <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                Fri, 10 Mar 09:00 AM
              </Typography>
            </Box>
            <Box sx={styles.salesBox}>
              <Typography variant="body3" sx={styles?.salesTextBox(theme)}>
                Closes Date
              </Typography>
              <Typography variant="body3" sx={styles?.salesHeading(theme)}>
                Tue, 14 Mar 10:00 AM
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <HorizontalTabs tabsDataArray={singleUserDealTabsData}>
              <Details />
              <ActivityLog />
              <Associations />
              <Tasks />
              <Notes />
              <Calls />
              <Meetings />
              <Emails />
            </HorizontalTabs>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewDetails;
