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
  const { tabVal, setTabVal, navigate, theme } = useSMSMarketing();

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${theme?.palette?.custom?.light_lavender_gray}`,
          p: 2.4,
          borderRadius: '8px',
        }}
      >
        <Stack
          direction={{ sm: 'row', xs: 'column' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
        >
          <Typography variant="h3" pb={1}>
            SMS Marketing
          </Typography>

          {tabVal === 0 && (
            <Stack direction={{ sm: 'row', xs: 'column' }} gap={1.5}>
              <FormControl fullWidth>
                <Select
                  sx={{
                    height: '52px',
                    width: '181px',
                    padding: '7px 0px',
                    alignItems: 'center',
                    display: 'flex',
                  }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={'monica'}
                  // value={}
                  // onChange={handleChange}
                >
                  <MenuItem value={'monica'}>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Avatar
                        alt="avatar"
                        src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D"
                      />
                      <Box>
                        <Typography>Monica</Typography>
                        <Typography>8023456789</Typography>
                      </Box>
                    </Stack>
                  </MenuItem>
                  <MenuItem value={'Nakita'}>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Avatar
                        alt="avatar"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJZE0VNh6-l13QFIf7SdXGqFIKnD-qOJP-yzN2r800&s"
                      />
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
              className="small"
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
        </Stack>
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
