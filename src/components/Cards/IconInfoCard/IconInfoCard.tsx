import { TruncateText } from '@/components/TruncateText';
import { pxToRem } from '@/utils/getFontValue';
import { Avatar, Box } from '@mui/material';

export const IconInfoCard = (props: any) => {
  const {
    onClick,
    name,
    description,
    Icon = null,
    textAlign = 'center',
    isActive = false,
  } = props;

  return (
    <Box
      onClick={() => onClick?.()}
      sx={{
        padding: 2,
        cursor: 'pointer',
        height: '100%',
        border: '2px solid',
        textAlign,
        borderColor: isActive ? 'primary.main' : 'primary.lighter',
        backgroundColor: isActive ? 'primary.lighter' : '',
      }}
    >
      {Icon !== null && (
        <Avatar sx={{ margin: 'auto' }} variant="rounded">
          <Icon />
        </Avatar>
      )}
      <TruncateText
        text={name}
        boxProps={{
          sx: { fontSize: pxToRem(18), fontWeight: 600 },
        }}
      />
      <TruncateText
        text={description}
        size={70}
        boxProps={{
          sx: { fontSize: pxToRem(14) },
        }}
      />
    </Box>
  );
};
