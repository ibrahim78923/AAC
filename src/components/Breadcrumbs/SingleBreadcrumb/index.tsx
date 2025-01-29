import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const SingleBreadcrumb = (props: any) => {
  const {
    previousPathname,
    activePathname,
    previousPathnameColor = 'primary.main',
    separator = <ArrowForwardIos fontSize="small" />,
  } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      <Typography variant="h3" sx={{ color: previousPathnameColor }}>
        {previousPathname}
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {separator}
      </Box>
      <Typography variant="h5" sx={{ color: 'slateBlue.main' }}>
        {activePathname}
      </Typography>
    </Box>
  );
};
