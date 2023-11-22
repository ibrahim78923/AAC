import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import CommonTabs from '@/components/Tabs';

import SMSDashboard from './SMSDashboard';

import SMSBroadcast from './SMSBroadcast';

import useSMSMarketing from './useSMSMarketing';

import CreateSMSBroadcast from './SMSBroadcast/CreateSMSBroadcast';

import { PlusIcon } from '@/assets/icons';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';

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
            {tabVal === 0 && (
              <Stack direction="row" gap={1}>
                <FormControl fullWidth sx={{ width: '181px' }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue={'monica'}
                    // value={age}
                    // onChange={handleChange}
                  >
                    <MenuItem value={'monica'}>Monica</MenuItem>
                    <MenuItem value={'nakita'}>Nakita</MenuItem>
                    <MenuItem value={'arkhan'}>AR Khan</MenuItem>
                  </Select>
                </FormControl>
                <Box>
                  <EditSmsIcon />
                </Box>
              </Stack>
            )}
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
          </CommonTabs>
        </Box>
      )}
    </>
  );
};

export default SMSMarketing;
