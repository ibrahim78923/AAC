import { fullName, fullNameInitial } from '@/utils/avatarUtils';
import { AvatarGroup } from '@mui/material';
import { CustomAvatar } from '../CustomAvatar';

export const CustomAvatarGroup = (props: any) => {
  const { avatarSize, max, customStyles, selectedUsers } = props;

  return (
    <AvatarGroup
      sx={{
        justifyContent: 'flex-end',
        ...customStyles,
        '.MuiAvatar-root': {
          bgcolor: 'primary.main',
          width: avatarSize?.width ?? 28,
          height: avatarSize?.height ?? 28,
          fontSize: (theme) => theme?.typography?.avatarNameInitial,
        },
      }}
      max={max}
      total={selectedUsers?.length}
    >
      {selectedUsers?.map((user: any) => (
        <CustomAvatar
          key={user?._id}
          avatarSrc={user?.avatar?.url ?? user?.avatar}
          nameInitial={fullNameInitial(user?.firstName, user?.lastName)}
          tooltipTitle={fullName(user?.firstName, user?.lastName)}
          avatarSize={avatarSize}
        />
      ))}
    </AvatarGroup>
  );
};
