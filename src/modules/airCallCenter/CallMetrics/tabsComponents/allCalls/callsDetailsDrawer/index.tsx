import CommonDrawer from '@/components/CommonDrawer';
import { Box, Tab, Tabs } from '@mui/material';
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
        <Box></Box>
      </Box>
    </CommonDrawer>
  );
};

export default CallsDetailsDrawer;
