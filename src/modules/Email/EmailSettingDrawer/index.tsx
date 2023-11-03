'use client';
import React from 'react';
import CommonDrawer from '@/components/CommonDrawer';
import { EmailSettingDrawerI } from './EmailSettingDrawer.interface';
import CommonTabs from '@/components/Tabs';
import { Box, Typography } from '@mui/material';
import EmailSetting from '../EmailSetting';
import { EmailArray } from '@/mock/modules/superAdmin/Email';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './EmailSettingDrawer.styles';

export const SettingsTabs = ['Email Settings', 'Calendar'];

const EmailSettingDrawer = ({
  isOpenDrawer,
  setIsOpenDrawer,
}: EmailSettingDrawerI) => {
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={() => setIsOpenDrawer(false)}
      title={'Email Settings'}
      okText={'Send'}
      isOk
      cancelText={'Cancel'}
      footer
    >
      <CommonTabs tabsArray={SettingsTabs}>
        <EmailSetting />
        <Box>
          {EmailArray?.map((item) => (
            <Box key={uuidv4()} sx={styles.emailArray}>
              {item.Icon}
              <Typography variant="h6">{item.Text}</Typography>
            </Box>
          ))}
        </Box>
      </CommonTabs>
    </CommonDrawer>
  );
};

export default EmailSettingDrawer;
