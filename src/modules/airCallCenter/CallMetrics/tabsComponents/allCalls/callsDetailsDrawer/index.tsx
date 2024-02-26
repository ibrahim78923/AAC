import { LeftArrowIcon } from '@/assets/icons';
import { CardBGBubbles } from '@/assets/images';
import CommonDrawer from '@/components/CommonDrawer';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const CallsDetailsDrawer = ({
  isCallDetailsDrawerOpen,
  setIsCallDetailsDrawerOpen,
}: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <CommonDrawer
      // isDrawerOpen={true}
      isDrawerOpen={isCallDetailsDrawerOpen}
      onClose={() => setIsCallDetailsDrawerOpen(false)}
      title={'Call Details for john'}
      okText={'Create'}
      isOk
      cancelText={'Cancel'}
      footer={false}
      submitHandler={() => setIsCallDetailsDrawerOpen(false)}
    >
      {/* <HorizontalTabs
        tabsDataArray={[
          'Call Summary',
          'Call Lifecycle',
          'Call Transcription',
          'Network Log',
        ]}
      >
        <>1</>
        <>2</>
        <>3</>
        <>4</>
      </HorizontalTabs> */}

      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{
          padding: '0',
          marginLeft: '-25px',
          '@media (max-width:599px)': {
            marginLeft: '0px',
          },
          '& .MuiTab-root': {
            marginRight: '30px',
          },
        }}
      >
        <Tab label="Call Summary" />
        <Tab label="Call Lifecycle" />
        <Tab label="Call Transcription" />
        <Tab label="Network Log" />
      </Tabs>

      <Box>
        <Box
          sx={{
            background: '#F6F7F9',
            height: '122px',
            borderRadius: '4px',
            padding: '15px',
            mt: 2,
            position: 'relative',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              right: '0',
              top: '0',
            }}
          >
            <Image src={CardBGBubbles} alt="card-bg" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              mb: 2,
              position: 'relative',
            }}
          >
            <Typography variant="body4" fontWeight={400}>
              Incoming call From +12013409847 (Medicines & Pharmacy)
            </Typography>
            <Typography variant="body4" fontWeight={400}>
              07 feb 21,2:15
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '90%',
              margin: '0 auto',
            }}
          >
            {/* to */}
            <Box>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Jhon
              </Typography>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Skynet Services
              </Typography>
            </Box>
            <Box>
              {' '}
              <LeftArrowIcon />{' '}
            </Box>
            {/* form  */}
            <Box>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Jhon
              </Typography>
              <Typography variant="body2" textAlign={'center'} fontWeight={400}>
                Skynet Services
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            background: '#F6F7F9',
            height: '122px',
            borderRadius: '4px',
            padding: '15px',
            mt: 2,
          }}
        ></Box>
      </Box>
    </CommonDrawer>
  );
};

export default CallsDetailsDrawer;
