import { Box, Button, Typography, Stack, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import CommonTabs from '@/components/Tabs';
import Dashboard from './Dashboard';
import Broadcast from './Broadcast';
import Contacts from './Contacts';
import Templates from './Templates';
import { PlusIcon, SettingsIcon } from '@/assets/icons';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';
import { styles } from './WhatsAppMarketing.style';
import { AIR_MARKETER } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_MARKETER_WHATSAPP_BROADCAST_CREATE_BROADCAST,
  AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS,
} from '@/constants/permission-keys';
import { indexNumbers } from '@/constants';
import useWhatsAppMarketing from '../useWhatsAppMarketing';
import { ACTIONS_TYPES, DRAWER_TYPES } from '@/constants/strings';
import NumberSelect from '../NumberSelect';

const WhatsAppMarketingComponent = () => {
  const router = useRouter();
  const { tabVal, setTabVal } = useWhatsAppMarketing();

  return (
    <Box sx={styles?.wrapper}>
      <Stack
        direction={{ sm: 'row' }}
        gap={2}
        justifyContent={'space-between'}
        sx={{ p: '24px' }}
      >
        <Typography variant="h3">WhatsApp Marketing </Typography>

        {tabVal === indexNumbers?.ZERO && (
          <Stack direction={{ sm: 'row', xs: 'column' }} gap={1.5}>
            <NumberSelect />

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.CREATE_BROADCAST,
                ]}
              >
                <Box
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {
                    router.push({
                      pathname:
                        AIR_MARKETER?.WHATSAPP_MERKETING_CREATE_BROADCAST,
                      query: { type: ACTIONS_TYPES?.ADD },
                    });
                  }}
                >
                  <EditSmsIcon size={45} />
                </Box>
              </PermissionsGuard>

              <IconButton
                onClick={() =>
                  router.push(
                    AIR_MARKETER?.WHATSAPP_MARKETING_INTEGRATION_CONFIG,
                  )
                }
              >
                <SettingsIcon size={40} />
              </IconButton>
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
                router.push({
                  pathname: AIR_MARKETER?.WHATSAPP_MERKETING_CREATE_BROADCAST,
                  query: { type: DRAWER_TYPES?.ADD },
                })
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
        defaultValue={tabVal}
      >
        <Dashboard setTabVal={setTabVal} />
        <Broadcast />
        <Contacts />
        <Templates />
      </CommonTabs>
    </Box>
  );
};

export default WhatsAppMarketingComponent;
