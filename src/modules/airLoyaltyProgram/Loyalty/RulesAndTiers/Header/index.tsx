import { Box, Button, Typography, useTheme } from '@mui/material';

export const Header = (props: any) => {
  const { upsertTiersHandler, upsertRulesHandler } = props;
  const theme: any = useTheme();
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={1}
        flexWrap={'wrap'}
      >
        <Typography variant="h3" color={theme?.palette?.slateBlue?.main}>
          Tiers and Rules
        </Typography>
        <Box display={'flex'} gap={2} flexWrap={'wrap'}>
          <Button variant="contained" onClick={() => upsertRulesHandler?.()}>
            Create Rules
          </Button>
          <Button variant="contained" onClick={() => upsertTiersHandler?.()}>
            Create Tiers
          </Button>
        </Box>
      </Box>
    </>
  );
};
