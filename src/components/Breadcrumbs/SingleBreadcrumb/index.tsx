import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';

export const SingleBreadcrumb = (props: any) => {
  const {
    previousPathname,
    activePathname,
    previousPathnameColor = 'primary.main',
    Separator = ArrowForwardIos,
    previousPathnameVariant = 'h3',
    activePathnameVariant = 'h5',
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
      <Typography
        variant={previousPathnameVariant}
        sx={{ color: previousPathnameColor }}
      >
        {previousPathname}
      </Typography>
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Separator fontSize="small" />
      </Box>
      <Typography
        variant={activePathnameVariant}
        sx={{ color: 'slateBlue.main' }}
      >
        {activePathname}
      </Typography>
    </Box>
  );
};
