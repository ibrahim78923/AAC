import { FilterIcon } from '@/assets/icons';
import CommonTabs from '@/components/Tabs';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import NotificationCard from './NotificationCard';
import { LeftSideData } from '../Chat.interface';
import ActionBtn from './ActionBtn';
import { styles } from './LeftSide.styles';

const LeftSide = (props: LeftSideData) => {
  const {
    getTabVal,
    inboxData,
    sentData,
    draftData,
    ScheduledData,
    trashData,
    actionButtonProps,
    filterBtnProps,
  } = props;
  return (
    <Box sx={styles.card}>
      <Box sx={styles.emailWrap}>
        <Typography>Email</Typography>
        <Box>
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            sx={{ marginRight: '14px' }}
            {...filterBtnProps}
          >
            Filter
          </Button>
          <ActionBtn {...actionButtonProps} />
        </Box>
      </Box>
      <CommonTabs
        tabsArray={['Inbox', 'Sent', 'Draft', 'Scheduled', 'Trash']}
        getTabVal={getTabVal}
      >
        <NotificationCard {...inboxData} />
        <NotificationCard {...sentData} />
        <NotificationCard {...draftData} />
        <NotificationCard {...ScheduledData} />
        <NotificationCard {...trashData} />
      </CommonTabs>
    </Box>
  );
};

export default LeftSide;
