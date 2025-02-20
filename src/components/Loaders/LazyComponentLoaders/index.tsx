import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { alpha, Box, Typography, useTheme } from '@mui/material';
import { LazyComponentLoadersPropsI } from '../Loaders.interface';

const LazyComponentLoaders = (props: LazyComponentLoadersPropsI) => {
  const theme: any = useTheme();
  const { name } = props;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: alpha(theme?.palette?.background?.paper, 0.775),
        zIndex: 99999,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ my: 1 }}>
          {`Almost done fetching ${name} ! Please hang on minute`}
        </Typography>
        <CustomLinearProgress width="100%" />
      </Box>
    </Box>
  );
};

export default LazyComponentLoaders;
