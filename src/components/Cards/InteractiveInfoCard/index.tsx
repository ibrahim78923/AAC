import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Box, Divider, Typography } from '@mui/material';
import { MoreHoriz, Group, AddCircle } from '@mui/icons-material';
import { TruncateText } from '@/components/TruncateText';
import { ConditionalPermissionGuard } from '@/GuardsAndPermissions/ConditionalPermissionGuard';
import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { generateColorFromName } from '@/utils/avatarUtils';
import { CustomAvatarGroup } from '@/components/Avatars/CustomAvatarGroup';

export const InteractiveInfoCard = (props: any) => {
  const {
    name,
    dropdownOptions,
    description,
    count,
    itemToCount,
    avatarSrc,
    dropdownPermissions,
    hasDropdownPermission = false,
    handleAddUser,
    usersList = [],
    hasAddUserPermission = false,
    addUserPermissions,
    showCount = true,
    hasAvatar = false,
    isShadowCard = false,
    hasUsersList = false,
  } = props;

  return (
    <Box
      width={'100%'}
      border={1}
      borderColor={isShadowCard ? 'transparent' : 'grey.0'}
      borderRadius={2}
      p={3}
      boxShadow={isShadowCard ? 2 : 0}
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
    >
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        flexWrap={'wrap'}
      >
        <Box display={'flex'} alignItems={'center'} gap={0.5} flexWrap={'wrap'}>
          {hasAvatar && (
            <CustomAvatar
              avatarSrc={avatarSrc}
              nameInitial={name?.slice?.(0, 2)}
              backgroundColor={generateColorFromName(name)}
              avatarSize={{ variant: 'rounded' }}
            />
          )}
          <Typography
            variant="h5"
            color="slateBlue.main"
            textTransform="capitalize"
          >
            <TruncateText text={name?.toLowerCase()} />
          </Typography>
        </Box>

        <ConditionalPermissionGuard
          hasNoPermission={hasDropdownPermission}
          permissions={dropdownPermissions}
        >
          <SingleDropdownButton
            dropdownOptions={dropdownOptions}
            dropdownName={<MoreHoriz />}
            hasEndIcon={false}
            btnVariant="text"
          />
        </ConditionalPermissionGuard>
      </Box>
      <Box
        dangerouslySetInnerHTML={{
          __html: description,
        }}
        sx={{
          color: 'custom.mulled_wine',
          overflow: 'auto',
          maxHeight: '10vh',
          flex: 1,
          my: 2,
          '&::-webkit-scrollbar': {
            width: 2,
            height: 2,
          },
        }}
      />

      <Divider sx={{ my: 2 }} />

      <Box display={'flex'} alignItems={'center'} gap={1}>
        {showCount && (
          <>
            <Group fontSize={'small'} sx={{ color: 'custom.mulled_wine' }} />
            <Typography variant={'body2'} color={'custom.mulled_wine'}>
              {count} {itemToCount}
            </Typography>
          </>
        )}
        {!!hasUsersList && (
          <>
            <CustomAvatarGroup max={4} selectedUsers={usersList} />
            <ConditionalPermissionGuard
              hasNoPermission={hasAddUserPermission}
              permissions={addUserPermissions}
            >
              <AddCircle
                color="primary"
                onClick={handleAddUser}
                sx={{ cursor: 'pointer' }}
              />
            </ConditionalPermissionGuard>
          </>
        )}
      </Box>
    </Box>
  );
};
