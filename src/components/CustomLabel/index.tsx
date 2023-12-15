import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomLabel = (props: any) => {
  const { label, required = false, marginBottom = 0.6 } = props;
  const { palette }: any = useTheme();
  return (
    <Typography
      sx={{
        '&::after': required
          ? {
              content: '"*"',
              color: palette?.error?.main,
            }
          : '',
        color: 'inherit',
        marginBottom: marginBottom,
      }}
    >
      {label}
    </Typography>
  );
};

export default CustomLabel;
