import { Box, Button, Typography } from '@mui/material';

import CommonTabs from '@/components/Tabs';

import SMSDashboard from './SMSDashboard';

import SMSBroadcast from './SMSBroadcast';

import useSMSMarketing from './useSMSMarketing';

import CreateSMSBroadcast from './SMSBroadcast/CreateSMSBroadcast';

import { PlusIcon } from '@/assets/icons';
import ContactsSMSMarketing from './Contacts';

const SMSMarketing = () => {
  const { tabVal, setTabVal, isCreateSmsBroadcast, setIsCreateSmsBroadcast } =
    useSMSMarketing();

  return (
    <>
      {isCreateSmsBroadcast ? (
        <CreateSMSBroadcast setIsCreateSmsBroadcast={setIsCreateSmsBroadcast} />
      ) : (
        <Box>
          <Box
            justifyContent="space-between"
            alignItems="center"
            sx={{ display: { md: 'flex' } }}
          >
            <Typography variant="h4">SMS Marketing</Typography>
            {tabVal === 1 && (
              <Button
                variant="contained"
                onClick={() => {
                  setIsCreateSmsBroadcast(true);
                }}
                startIcon={<PlusIcon />}
              >
                Create SMS Broadcast
              </Button>
            )}
          </Box>
          <CommonTabs
            tabsArray={['Dashboard', 'SMS Broadcast', 'Contacts', 'Templates']}
            getTabVal={(val: number) => setTabVal(val)}
          >
            <SMSDashboard />
            <SMSBroadcast />
            <ContactsSMSMarketing />
          </CommonTabs>
        </Box>
      )}
    </>
  );
};

export default SMSMarketing;
