import { Box, Radio, Typography, useTheme } from '@mui/material';
import { style } from './CheckboxCard.style';
import { CheckboxCardI } from './CheckboxCard.interface';
import { AVATAR_VARIANTS } from '@/constants/mui-constant';
import { IconAvatar } from '@/components/Avatars/IconAvatar';

const CheckboxCard = ({
  icon: Icon,
  value,
  title = '',
  desc = '',
  checkedValue,
  handleSelect,
}: CheckboxCardI) => {
  const { palette } = useTheme();
  const checked = value === checkedValue;
  return (
    <Box
      sx={style?.cardWrapper(palette, checked)}
      onClick={() => handleSelect(checkedValue)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconAvatar
          avatarSize={{
            width: 56,
            height: 56,
            variant: AVATAR_VARIANTS?.ROUNDED,
          }}
          backgroundColor={'grey.400'}
        >
          <Icon />
        </IconAvatar>
        <Box>
          <Typography variant="h5" fontWeight={500} pb={0.4}>
            {title}
          </Typography>
          <Typography variant="body2" color="grey.600">
            {desc}
          </Typography>
        </Box>
      </Box>
      <Radio checked={checked} />
    </Box>
  );
};

export default CheckboxCard;
