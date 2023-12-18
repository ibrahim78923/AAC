import { Avatar, Box, Radio, Typography, useTheme } from '@mui/material';
import { style } from './CheckboxCard.style';

const CheckboxCard = ({
  icon,
  value,
  title = '',
  desc = '',
  handleSelect,
}: any) => {
  const { palette } = useTheme();
  const checked = value === title;
  return (
    <Box
      sx={style?.cardWrapper(palette, checked)}
      onClick={() => handleSelect(title)}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Avatar
          variant="rounded"
          src={icon}
          alt={title}
          sx={{
            bgcolor: palette?.primary?.light,
            p: 1.2,
            width: 48,
            height: 48,
          }}
        />
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
