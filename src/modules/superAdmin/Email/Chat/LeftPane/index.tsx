import { FilterIcon } from '@/assets/icons';
import { Box, Button, ButtonGroup, Typography, useTheme } from '@mui/material';
import React from 'react';
import MailList from './MailList';
import { LeftSideData } from '../Chat.interface';
import ActionBtn from './ActionBtn';
import { styles } from './LeftPane.styles';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setMailTabType } from '@/redux/slices/email/slice';
import { useAppSelector } from '@/redux/store';

const tabsArray = [
  {
    label: 'Inbox',
    value: 'inbox',
  },
  {
    label: 'Sent',
    value: 'sent',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Scheduled',
    value: 'scheduled',
  },
  {
    label: 'Trash',
    value: 'trash',
  },
];

const LeftPane = (props: LeftSideData) => {
  const { actionButtonProps, filterBtnProps } = props;

  const theme = useTheme();
  const dispatch = useDispatch();

  const mailTabType = useAppSelector((state: any) => state?.email?.mailTabType);

  const handelToggleTab = (value: any) => {
    dispatch(setMailTabType(value));
  };

  return (
    <Box sx={styles?.card(theme)}>
      <Box sx={styles?.emailWrap}>
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

      <ButtonGroup
        fullWidth
        variant="outlined"
        aria-label="Basic button group"
        sx={{ mb: 1 }}
      >
        {tabsArray?.map((item: any) => (
          <Button
            key={uuidv4()}
            onClick={() => handelToggleTab(item?.value)}
            sx={{
              border: `1px solid ${theme?.palette?.grey[700]}`,
              borderRadius: '8px',
              color: theme?.palette?.secondary?.main,
              backgroundColor:
                mailTabType === item?.value ? theme?.palette?.grey[400] : '',
              '&:hover': {
                backgroundColor:
                  mailTabType === item?.value ? theme?.palette?.grey[400] : '',
                border: `1px solid ${theme?.palette?.grey[700]}`,
              },
            }}
          >
            {item?.label}
          </Button>
        ))}
      </ButtonGroup>

      <MailList />
      {/* <CommonTabs
        tabsArray={['Inbox', 'Sent', 'Draft', 'Scheduled', 'Trash']}
        getTabVal={getTabVal}
      >
        <NotificationCard {...inboxData} />
        <NotificationCard {...sentData} />
        <NotificationCard {...draftData} />
        <NotificationCard {...ScheduledData} />
        <NotificationCard {...trashData} />
      </CommonTabs> */}
    </Box>
  );
};

export default LeftPane;
