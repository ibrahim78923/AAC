import {
  Avatar,
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

import { PlusIcon } from '@/assets/icons';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';
import ContactsSMSMarketing from './Contacts';

import { AIR_MARKETER } from '@/routesConstants/paths';

const SMSMarketing = () => {
  const { tabVal, setTabVal, navigate } = useSMSMarketing();

  return (
    <>
      <Box>
        <Box
          justifyContent="space-between"
          alignItems="center"
          sx={{ display: { md: 'flex' } }}
        >
          <Typography variant="h4">SMS Marketing</Typography>
          {tabVal === 0 && (
            <Stack direction="row" gap={1} alignItems="center">
              <FormControl fullWidth sx={{ width: '200px' }}>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={'monica'}
                  // value={}
                  // onChange={handleChange}
                >
                  <MenuItem value={'monica'}>
                    <Stack direction="row" gap={1}>
                      <Avatar />
                      <Box>
                        <Typography>Monica</Typography>
                        <Typography>8023456789</Typography>
                      </Box>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={'Nakita'}>
                    <Stack direction="row" gap={1}>
                      <Avatar />
                      <Box>
                        <Typography>Nakita</Typography>
                        <Typography>0987654321</Typography>
                      </Box>
                    </Stack>
                  </MenuItem>
                </Select>
              </FormControl>
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate.push({
                    pathname: AIR_MARKETER?.CREATE_SMS_BROADCAST,
                    query: { type: 'edit' },
                  });
                }}
              >
                <EditSmsIcon />
              </Box>
            </Stack>
          )}
          {tabVal === 1 && (
            <Button
              variant="contained"
              onClick={() => {
                navigate.push({
                  pathname: AIR_MARKETER?.CREATE_SMS_BROADCAST,
                  query: { type: 'add' },
                });
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
    </>
  );
};

export default SMSMarketing;
