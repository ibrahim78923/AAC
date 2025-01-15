import { CustomAvatar } from '@/components/CustomAvatar';
import { TruncateText } from '@/components/TruncateText';
import { pxToRem } from '@/utils/getFontValue';
import { Box, Typography } from '@mui/material';

export const AvatarInfoCard = (props: any) => {
  const { name, description, info, onClick, avatarSrc, avatarSize } = props;

  return (
    <>
      <Box
        onClick={() => onClick?.()}
        borderRadius={2}
        border={'1px solid'}
        borderColor={'primary.lighter'}
        display={'flex'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        gap={2}
        p={1}
        height="100%"
      >
        <CustomAvatar
          avatarSize={{
            height: avatarSize?.width ?? pxToRem(64),
            width: avatarSize?.height ?? pxToRem(64),
            variant: avatarSize?.variant,
          }}
          avatarSrc={avatarSrc}
        />
        <Box>
          <TruncateText
            text={name}
            boxProps={{
              sx: { fontSize: pxToRem(18), fontWeight: 600 },
            }}
          />
          <TruncateText
            text={description}
            size={100}
            boxProps={{
              sx: { fontSize: pxToRem(14) },
            }}
          />
          {!!info && (
            <Typography variant="body2" component={'div'}>
              {info}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};
