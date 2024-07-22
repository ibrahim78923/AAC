import React from 'react';
import {
  Box,
  Button,
  Typography,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useRouter } from 'next/router';
import CommonTabs from '@/components/Tabs';
import Dashboard from './Dashboard';
import Broadcast from './Broadcast';
import Contacts from './Contacts';
import Templates from './Templates';
import { PlusIcon } from '@/assets/icons';
import useWhatsAppMarketingComponent from './useWhatsAppMarketingComponent';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';
import { styles } from './WhatsAppMarketing.style';
import { AIR_MARKETER } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_BROADCAST_CREATE_BROADCAST } from '@/constants/permission-keys';

const WhatsAppMarketingComponent = () => {
  const router = useRouter();
  const { tabVal, setTabVal } = useWhatsAppMarketingComponent();

  return (
    <Box sx={styles?.wrapper}>
      <Stack
        direction={{ sm: 'row' }}
        gap={2}
        justifyContent={'space-between'}
        sx={{ p: '24px' }}
      >
        <Typography variant="h3">WhatsApp Marketing </Typography>
        {tabVal === 0 && (
          <Stack direction={{ sm: 'row' }} gap={2}>
            <Box>
              <FormControl
                fullWidth
                sx={{
                  width: '181px',
                  '& .MuiInputBase-input': {
                    py: '14px',
                  },
                }}
              >
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  defaultValue={'monica'}
                >
                  <MenuItem value={'monica'}>Monica</MenuItem>
                  <MenuItem value={'nakita'}>Nakita</MenuItem>
                  <MenuItem value={'arkhan'}>AR Khan</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ height: '52px' }}>
              <EditSmsIcon />
            </Box>
          </Stack>
        )}
        {tabVal === 1 && (
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_BROADCAST_CREATE_BROADCAST?.CREATE_BROADCAST,
            ]}
          >
            <Button
              startIcon={<PlusIcon />}
              className="small"
              variant="contained"
              onClick={() =>
                router.push(AIR_MARKETER?.WHATSAPP_MERKETING_CREATE_BROADCAST)
              }
            >
              Create Broadcast
            </Button>
          </PermissionsGuard>
        )}
      </Stack>

      <CommonTabs
        tabsArray={['Dashboard', 'Broadcast', 'Contacts', 'Templates']}
        getTabVal={(val: number) => setTabVal(val)}
      >
        <Dashboard />
        <Broadcast />
        <Contacts />
        <Templates />
      </CommonTabs>
    </Box>
  );
};

export default WhatsAppMarketingComponent;
