import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import CommonTabs from '@/components/Tabs';
import SMSDashboard from './SMSDashboard';
import SMSBroadcast from './SMSBroadcast';
import useSMSMarketing from './useSMSMarketing';
import { PlusIcon } from '@/assets/icons';
import EditSmsIcon from '@/assets/icons/modules/airMarketer/SMSMarketing/edit-sms-icon';
import ContactsSMSMarketing from './Contacts';
import { AIR_MARKETER } from '@/routesConstants/paths';
import Templates from './Templates';
import ConnectNumber from './ConnectNumber';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import {
  AIR_MARKETER_SMS_BROADCAST_CREATE_BROADCAST,
  AIR_MARKETER_SMS_MARKETING_PERMISSIONS,
} from '@/constants/permission-keys';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { getSession } from '@/utils';
import { generateImage } from '@/utils/avatarUtils';
import { indexNumbers } from '@/constants';

const SMSMarketing = () => {
  const {
    theme,
    tabVal,
    navigate,
    setTabVal,
    isLoading,
    isConnected,
    setIsConnected,
    getIsPhoneConnected,
  } = useSMSMarketing();

  const { user }: any = getSession();

  return (
    <>
      {isConnected ? (
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
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </Avatar>
                  <Box display="flex" flexDirection="column">
                    <Typography
                      color={theme?.palette?.grey[900]}
                      variant="body3"
                    >
                      {user?.firstName} {user?.lastName}
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
                    AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.EDIT_SMS_BROADCAST,
                  ]}
                >
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
                </PermissionsGuard>
              </Stack>
            )}
            {tabVal === indexNumbers?.ONE && (
              <PermissionsGuard
                permissions={[
                  AIR_MARKETER_SMS_BROADCAST_CREATE_BROADCAST?.CREATE_BROADCAST,
                ]}
              >
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
              </PermissionsGuard>
            )}
          </Stack>
          <CommonTabs
            tabsArray={['Dashboard', 'SMS Broadcast', 'Contacts', 'Templates']}
            getTabVal={(val: number) => setTabVal(val)}
            activeTab={tabVal}
          >
            <SMSDashboard setTabVal={setTabVal} />
            <SMSBroadcast />
            <ContactsSMSMarketing />
            <Templates />
          </CommonTabs>
        </Box>
      ) : isLoading ? (
        <SkeletonTable />
      ) : (
        <ConnectNumber setIsConnected={setIsConnected} />
      )}
    </>
  );
};

export default SMSMarketing;
