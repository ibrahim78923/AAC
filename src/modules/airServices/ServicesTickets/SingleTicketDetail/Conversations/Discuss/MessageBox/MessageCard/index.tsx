import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { MoreVert } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const MessageCard = (props: any) => {
  const { message, chatMessagesDropdown, authUser } = props;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      gap={2}
      flexDirection={
        message?.createdBy === authUser?._id ? 'row-reverse' : 'row'
      }
      mb={2}
    >
      <CustomAvatar
        avatarSize={{ width: 40, height: 40 }}
        avatarSrc={message?.createdByAvatar}
      />
      <Box bgcolor={'primary.light'} p={1} borderRadius={2}>
        <Box>
          <Typography
            variant="body2"
            color="grey.600"
            fontWeight="fontWeightMedium"
            sx={{ wordBreak: 'break-all' }}
          >
            {!!message?.reply ? message?.reply : message?.text}
          </Typography>
          {!!message?.reply && (
            <Box
              bgcolor={'custom.light_green_background'}
              p={1}
              borderRadius={2}
              mt={1}
              borderLeft={'4px solid'}
              sx={{ borderLeftColor: 'primary.main' }}
            >
              <Typography
                variant="body2"
                color="grey.600"
                fontWeight="fontWeightMedium"
                sx={{ wordBreak: 'break-all' }}
              >
                {message?.text}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <SingleDropdownButton
          dropdownOptions={chatMessagesDropdown}
          dropdownName={<MoreVert />}
          hasEndIcon={false}
          btnVariant="text"
        />
      </Box>
    </Box>
  );
};
