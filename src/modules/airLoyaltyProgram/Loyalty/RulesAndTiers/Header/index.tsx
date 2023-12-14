import { Box, Button, Typography } from '@mui/material';

export const Header = (props: any) => {
  const { upsertTiersHandler, upsertRulesHandler } = props;
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={1}
        flexWrap={'wrap'}
      >
        <Typography>Rules and tiers</Typography>
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
