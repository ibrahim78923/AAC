'use client';
import React from 'react';
import EmailChat from './Chat';

const Email = () => {
  return (
    <>
      {/* <>
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
          <Box sx={styles?.settingIcon} onClick={() => setIsOpenDrawer(true)}>
            <Settings />
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              Email Settings
            </Typography>
          </Box>
        </Box>
        <Typography variant="h4" sx={{ color: '#374151' }}>
          Select Your Email Provider:
        </Typography>
        <Typography variant="body2" sx={styles?.emailAlert}>
          <EmailInfoIcon />
          Dummy@gmail.com is Hosted by Gmail. We recommend you select this
          provider
        </Typography>
        <Box display={'flex'} flexWrap={'wrap'} gap={'15px'}>
          {EmailArray?.map((item: any) => (
            <Box key={uuidv4()} sx={styles?.emailArray}>
              {item?.Icon}
              <Typography variant="h6">{item?.Text}</Typography>
            </Box>
          ))}
          <Box sx={styles?.emailArray}>
            <Typography variant="h6">Others</Typography>
          </Box>
        </Box>
        {isOpenDrawer && (
          <EmailSettingDrawer
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
        )}
      </> */}

      <EmailChat />
    </>
  );
};
export default Email;
