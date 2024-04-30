import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { styles } from './Email.styles';
import { Settings } from '@mui/icons-material';
import { EmailInfoIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { emailsDataArray } from './Email.data';
import { OthersMail } from '@/assets/images';
import Image from 'next/image';
import Link from 'next/link';
import { EMAIL_SUB_ROUTES } from '@/constants';
import EmailSettingDrawer from './EmailSettingDrawer';
import OtherMailDrawer from './OtherMailDrawer';

const Email = () => {
  const theme = useTheme();

  const [isEmailSettingsDrawerOpen, setIsEmailSettingsDrawerOpen] =
    useState(false);

  const [isOtherEmailDrawerOpen, setIsOtherEmailDrawerOpen] = useState(false);

  // const {
  //   data: foldersData,
  // } = useGetMailFoldersQuery({});

  // console.log("foldersData", foldersData?.data)

  return (
    <>
      <>
        <Box sx={styles?.emailWrapper}>
          <Box>
            <Typography variant="h3" sx={styles?.heading(theme)}>
              Connect Your Inbox to Air Applecart
            </Typography>
            <Typography variant="body2" sx={styles?.paragraph(theme)}>
              Manage your work email in a private inbox that stays in sync with
              your email provider.
            </Typography>
          </Box>
          <Box
            sx={styles?.settingIcon}
            onClick={() => setIsEmailSettingsDrawerOpen(true)}
          >
            <Settings />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Email Settings
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="h4"
          sx={{ color: theme?.palette?.slateBlue?.main }}
        >
          Select Your Email Provider:
        </Typography>
        <Typography variant="body2" sx={styles?.emailAlert}>
          <EmailInfoIcon />
          Dummy@gmail.com is Hosted by Gmail. We recommend you select this
          provider
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={'15px'}>
          {emailsDataArray?.map((item: any) => (
            <Box key={uuidv4()} sx={styles?.emailArray}>
              {item?.icon}
              <Typography variant="h6">{item?.label}</Typography>
            </Box>
          ))}
          <Box
            sx={styles?.emailArray}
            onClick={() => setIsOtherEmailDrawerOpen(true)}
          >
            <Image src={OthersMail} alt="other" />
            <Typography variant="h6">Others</Typography>
          </Box>
        </Box>
        <Link href={`${EMAIL_SUB_ROUTES?.EMAIL_CONVERSATIONS}`}>
          <Box>conversations</Box>
        </Link>
        <EmailSettingDrawer
          isOpenDrawer={isEmailSettingsDrawerOpen}
          setIsOpenDrawer={setIsEmailSettingsDrawerOpen}
        />

        <OtherMailDrawer
          openDrawer={isOtherEmailDrawerOpen}
          setOpenDrawer={setIsOtherEmailDrawerOpen}
        />
      </>
      {/* <EmailChat /> */}
    </>
  );
};

export default Email;
