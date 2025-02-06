import { TruncateText } from '@/components/TruncateText';
import { uiDateFormat } from '@/lib/date-time';
import { pxToRem } from '@/utils/getFontValue';
import { Avatar, Box, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import { IconInfoCardPropsI } from '../Cards.interface';

const iconTypesMap: any = {
  folder: <FolderIcon color={'primary'} fontSize={'large'} />,
};

export const IconInfoCard = (props: IconInfoCardPropsI) => {
  const {
    onClick,
    name,
    description,
    hasIcon = true,
    textAlign = 'center',
    isActive = false,
    avatarBackgroundColor = 'primary.lighter',
    descriptionType,
    createdDate,
    dateType,
    iconType = 'folder',
  } = props;

  const mapIcon = iconTypesMap?.[iconType];

  return (
    <Box
      onClick={() => onClick?.()}
      sx={{
        padding: 2,
        paddingY: 3,
        cursor: 'pointer',
        height: '100%',
        border: '1px solid',
        borderRadius: 2,
        textAlign,
        borderColor: isActive ? 'primary.main' : 'custom.off_white_three',
        backgroundColor: isActive ? 'primary.lighter' : '',
      }}
    >
      {hasIcon && (
        <Avatar
          sx={{ margin: 'auto', backgroundColor: avatarBackgroundColor }}
          variant="rounded"
        >
          {mapIcon}
        </Avatar>
      )}
      <TruncateText
        text={name}
        boxProps={{
          sx: {
            fontSize: pxToRem(18),
            fontWeight: 600,
            my: 1.5,
          },
        }}
      />
      {description && (
        <TruncateText
          isCapital={false}
          text={description}
          size={70}
          boxProps={{
            sx: { fontSize: pxToRem(14) },
          }}
          retainTextLeft={descriptionType}
        />
      )}
      {createdDate && (
        <Typography variant="body2" color="slateBlue.main" sx={{ mt: 1 }}>
          {dateType} {uiDateFormat(createdDate)}
        </Typography>
      )}
    </Box>
  );
};
