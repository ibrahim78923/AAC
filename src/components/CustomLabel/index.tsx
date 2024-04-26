import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomLabel = (props: any) => {
  const { label, required = false, marginBottom = 0.6 } = props;
  const { palette }: any = useTheme();
  return (
    <Typography
      sx={{
        color: 'grey.600',
        marginBottom: marginBottom,
      }}
      variant="body2"
      fontWeight={500}
    >
      {label}
      {required && (
        <Typography color={palette?.error?.main} component="span">
          {' '}
          *{' '}
        </Typography>
      )}
    </Typography>
  );
};

export default CustomLabel;
