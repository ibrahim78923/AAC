import React from 'react';
import CommonTabs from '@/components/Tabs';
import Dashboard from './Dashboard';
import Broadcast from './Broadcast';
import Contacts from './Contacts';
import Templates from './Templates';
import { Box, Button, Typography } from '@mui/material';
import { styles } from './WhatsAppMarketing.style';
import { PlusIcon } from '@/assets/icons';
import useWhatsAppMarketingComponent from './useWhatsAppMarketingComponent';
import CreateBroadcast from './CreateBroadcast';

const WhatsAppMarketingComponent = () => {
  const { tabVal, setTabVal, isCreateBroadcast, setIsCreateBroadcast } =
    useWhatsAppMarketingComponent();

  return (
    <>
      {isCreateBroadcast ? (
        <CreateBroadcast
          setIsCreateBroadcast={setIsCreateBroadcast}
          setTabVal={setTabVal}
        />
      ) : (
        <Box sx={styles?.wrapper}>
          <Box sx={styles.heading}>
            <Typography variant="h3">WhatsApp Marketing </Typography>
            {tabVal === 1 && (
              <Button
                startIcon={<PlusIcon />}
                className="small"
                variant="contained"
                onClick={() => setIsCreateBroadcast(true)}
              >
                Create Broadcast
              </Button>
            )}
          </Box>

          <CommonTabs
            tabsArray={['Dashboard', 'Broadcast', 'Contacts', 'Templates']}
            getTabVal={(val: number) => setTabVal(val)}
          >
            <Dashboard />
            <Broadcast setIsCreateBroadcast={setIsCreateBroadcast} />
            <Contacts />
            <Templates />
          </CommonTabs>
        </Box>
      )}
    </>
  );
};

export default WhatsAppMarketingComponent;
