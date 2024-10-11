import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import useContacts from './useContacts';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './Contacts.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import { indexNumbers } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { capitalizeFirstLetter } from '@/utils/api';
import { generateImage } from '@/utils/avatarUtils';
import { PAGINATION } from '@/config';

const SMSContacts = ({ setTabVal }: any) => {
  const { theme, allContacts, loadingGetContacts, recentContactsCount } =
    useContacts();

  return (
    <Box sx={{ pr: '24px' }}>
      <Box sx={styles?.SMSContactsCardStyle}>
        <Typography variant="h4" sx={styles?.heading(theme)}>
          Contacts
        </Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography>
            <Box component={'span'} sx={{ color: 'primary.main' }}>
              Total Contacts:
            </Box>
            {allContacts?.length}
          </Typography>
          <Typography>
            <Box component={'span'} sx={{ color: 'primary.main' }}>
              New Contacts:
            </Box>
            {recentContactsCount < PAGINATION?.PAGE_LIMIT
              ? `0${recentContactsCount}`
              : recentContactsCount}
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Latest Added (Past 24 hours)</Typography>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.VIEW_CONTACT,
            ]}
          >
            <Button size="small" onClick={() => setTabVal(indexNumbers?.TWO)}>
              View All
            </Button>
          </PermissionsGuard>
        </Stack>

        {loadingGetContacts ? (
          <SkeletonTable />
        ) : (
          <Box className="cardWrapper">
            {allContacts?.map((item: any) => (
              <Stack
                key={uuidv4()}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                className="innerCard"
              >
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      color: theme?.palette?.grey[600],
                      fontSize: '16px',
                      fontWeight: 500,
                    }}
                    src={generateImage(item?.profilePicture?.url)}
                  >
                    {capitalizeFirstLetter(item?.firstName?.charAt(0)) +
                      capitalizeFirstLetter(item?.lastName?.charAt(0))}
                  </Avatar>
                  <Typography>
                    {item?.firstName
                      ? `${capitalizeFirstLetter(
                          item?.firstName,
                        )} ${capitalizeFirstLetter(item?.lastName)}`
                      : 'N/A'}
                  </Typography>
                </Box>
                <Typography>{item?.whatsAppNumber}</Typography>
              </Stack>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SMSContacts;
