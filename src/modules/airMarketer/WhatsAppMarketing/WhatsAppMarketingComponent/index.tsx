import { Box, Button, Typography, Stack, Avatar } from '@mui/material';
import { useRouter } from 'next/router';
import CommonTabs from '@/components/Tabs';
import Dashboard from './Dashboard';
import Broadcast from './Broadcast';
import Contacts from './Contacts';
import Templates from './Templates';
import { PlusIcon } from '@/assets/icons';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';
import { styles } from './WhatsAppMarketing.style';
import { AIR_MARKETER } from '@/routesConstants/paths';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_MARKETER_WHATSAPP_BROADCAST_CREATE_BROADCAST,
  AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS,
} from '@/constants/permission-keys';
import { indexNumbers } from '@/constants';
import { generateImage } from '@/utils/avatarUtils';
import { capitalizeFirstLetter } from '@/utils/api';
import useWhatsAppMarketing from '../useWhatsAppMarketing';
import { getSession } from '@/utils';
import { ACTIONS_TYPES } from '@/constants/strings';

const WhatsAppMarketingComponent = () => {
  const { user }: any = getSession();
  const router = useRouter();
  const { tabVal, setTabVal, getIsPhoneConnected, theme } =
    useWhatsAppMarketing();

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
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              sx={{
                border: `1px solid ${theme?.palette?.grey[700]}`,
                padding: '7px 12px',
                borderRadius: '4px',
              }}
            >
              <Avatar
                src={generateImage(user?.avatar?.url)}
                sx={{ color: theme?.palette?.grey[600] }}
              >
                {capitalizeFirstLetter(
                  user?.firstName?.charAt(indexNumbers?.ZERO),
                )}
                {capitalizeFirstLetter(
                  user?.lastName?.charAt(indexNumbers?.ZERO),
                )}
              </Avatar>
              <Box display="flex" flexDirection="column">
                <Typography color={theme?.palette?.grey[900]} variant="body3">
                  {capitalizeFirstLetter(user?.firstName)}{' '}
                  {capitalizeFirstLetter(user?.lastName)}
                </Typography>
                <Typography
                  variant="body3"
                  fontWeight={500}
                  color={theme?.palette?.custom?.main}
                >
                  {getIsPhoneConnected &&
                    getIsPhoneConnected?.data?.phoneNumber}
                </Typography>
              </Box>
            </Box>
            <PermissionsGuard
              permissions={[
                AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.CREATE_BROADCAST,
              ]}
            >
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  router.push({
                    pathname: AIR_MARKETER?.WHATSAPP_MERKETING_CREATE_BROADCAST,
                    query: { type: ACTIONS_TYPES?.ADD },
                  });
                }}
              >
                <EditSmsIcon />
              </Box>
            </PermissionsGuard>
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
