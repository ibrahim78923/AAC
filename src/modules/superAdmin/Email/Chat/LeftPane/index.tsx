import { FilterIcon } from '@/assets/icons';
import { Box, Button, ButtonGroup, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MailList from './MailList';
import ActionBtn from './ActionBtn';
import { styles } from './LeftPane.styles';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { setMailTabType } from '@/redux/slices/email/slice';
import { useAppSelector } from '@/redux/store';
import CommonDrawer from '@/components/CommonDrawer';

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

const LeftPane = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const mailTabType = useAppSelector((state: any) => state?.email?.mailTabType);
  const handelToggleTab = (value: any) => {
    dispatch(setMailTabType(value));
  };

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <Box sx={styles?.card(theme)}>
      <Box sx={styles?.emailWrap}>
        <Typography variant="h3">Email</Typography>
        <Box>
          <Button
            startIcon={<FilterIcon />}
            variant="outlined"
            sx={{ marginRight: '14px', height: '36px' }}
            color="inherit"
            onClick={() => setIsFiltersOpen(true)}
          >
            Filter
          </Button>
          <ActionBtn />
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

      <CommonDrawer
        isDrawerOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        title={'filter'}
        okText={'submit'}
        isOk={true}
      >
        <>Filter Cont.</>
      </CommonDrawer>
    </Box>
  );
};

export default LeftPane;
