import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import useSMSContacts from './useSMSContacts';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './SMSContacts.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_SMS_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import useSMSDashboard from '../useSMSDashboard';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';

const SMSContacts = (props: any) => {
  const { setTabVal } = props;
  const { theme } = useSMSContacts();
  const { getContactData, contactDataLoading } = useSMSDashboard();

  return (
    <Box sx={styles?.SMSContactsCardStyle}>
      <Typography variant="h4" sx={styles?.heading(theme)}>
        SMS Contacts
      </Typography>
      <Stack
        direction={{ sm: 'row', xs: 'column' }}
        justifyContent="space-between"
      >
        <Box display="flex">
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            Total Contacts:
          </Typography>
          <Typography variant="h5" fontWeight="500">
            {getContactData?.data?.contacts?.length}
          </Typography>
        </Box>

        <Box display="flex">
          <Typography
            variant="h5"
            fontWeight="500"
            sx={{ color: theme?.palette?.primary?.main }}
          >
            New Contacts:
          </Typography>
          <Typography variant="h5" fontWeight="500">
            {getContactData?.data?.contacts?.length}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="subtitle2"
          sx={{ color: theme?.palette?.secondary?.main }}
        >
          Latest Added
        </Typography>
        <PermissionsGuard
          permissions={[
            AIR_MARKETER_SMS_MARKETING_PERMISSIONS?.VIEW_SMS_CONTACTS,
          ]}
        >
          <Button
            variant="text"
            size="small"
            onClick={() => {
              setTabVal(2);
            }}
          >
            View All
          </Button>
        </PermissionsGuard>
      </Stack>

      {contactDataLoading ? (
        <SkeletonTable />
      ) : (
        <Box className="cardWrapper">
          {getContactData?.data?.contacts?.map((item: any) => (
            <Stack
              key={uuidv4()}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              className="innerCard"
            >
              <Box
                sx={{
                  display: { sm: 'flex', xs: 'block' },
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <Avatar
                  sx={{
                    color: theme?.palette?.grey[600],
                    fontSize: '16px',
                    fontWeight: 500,
                  }}
                >
                  {item?.firstName?.charAt(0) + item?.lastName?.charAt(0)}
                </Avatar>
                <Typography
                  variant="body2"
                  fontWeight="500"
                  sx={{ color: theme?.palette?.grey[600] }}
                >
                  {item?.firstName} {item?.lastName}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ color: theme?.palette?.grey[600] }}
              >
                {item?.phoneNumber}
              </Typography>
            </Stack>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SMSContacts;
