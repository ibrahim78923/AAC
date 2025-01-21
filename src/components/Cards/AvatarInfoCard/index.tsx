import { CustomAvatar } from '@/components/Avatars/CustomAvatar';
import { TruncateText } from '@/components/TruncateText';
import { fullNameInitial } from '@/utils/avatarUtils';
import { pxToRem } from '@/utils/getFontValue';
import { Box, Checkbox, Typography } from '@mui/material';

export const AvatarInfoCard = (props: any) => {
  const {
    name,
    description,
    info,
    onClick,
    avatarSrc,
    avatarSize,
    onCheckboxChange,
    checked,
    hasCheckbox = false,
    infoType,
    descriptionType,
    subInfo,
    subInfoType,
    caption,
    captionType,
  } = props;

  return (
    <>
      <Box
        onClick={() => onClick?.()}
        borderRadius={2}
        border={'1px solid'}
        borderColor={'primary.lighter'}
        display={'flex'}
        sx={{ cursor: 'pointer' }}
        gap={2}
        p={1}
        height="100%"
      >
        <Box>
          {hasCheckbox && (
            <Checkbox
              checked={checked}
              onClick={(e) => {
                e?.stopPropagation();
              }}
              onChange={onCheckboxChange}
              sx={{ p: 0 }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: hasCheckbox ? 'block' : 'flex',
            gap: 2,
            alignItems: 'center',
          }}
        >
          <CustomAvatar
            avatarSize={{
              height: avatarSize?.width ?? 64,
              width: avatarSize?.height ?? 64,
              variant: avatarSize?.variant,
            }}
            avatarSrc={avatarSrc}
            nameInitial={fullNameInitial(name)}
          />
          <Box>
            <TruncateText
              text={name}
              boxProps={{
                sx: {
                  fontSize: pxToRem(18),
                  fontWeight: 600,
                  marginY: hasCheckbox ? 0.5 : 0,
                },
              }}
            />
            <TruncateText
              text={description}
              retainTextLeft={descriptionType}
              size={100}
              boxProps={{
                sx: { fontSize: pxToRem(14), color: 'custom.main' },
              }}
            />
            {!!info && (
              <Typography
                variant="body2"
                sx={{ color: 'custom.main' }}
                component={'div'}
              >
                {infoType} {info}
              </Typography>
            )}
            {subInfo && (
              <TruncateText
                text={subInfo}
                retainTextLeft={subInfoType}
                size={100}
                boxProps={{
                  sx: { fontSize: pxToRem(14), color: 'custom.main' },
                }}
              />
            )}
            {caption && (
              <TruncateText
                text={caption}
                retainTextLeft={captionType}
                size={100}
                boxProps={{
                  sx: { fontSize: pxToRem(14), color: 'custom.main' },
                }}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};
