import { Box, Button, Typography } from '@mui/material';
import { AddCircleBlackIcon, DesignPenIcon } from '@/assets/icons';

export const Header = ({ showButtons }: any) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      mb={3}
    >
      <Box p={1}>
        <Typography variant="h3">Gift cards</Typography>
      </Box>
      {showButtons && (
        <Box display={'flex'} gap={1}>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            startIcon={<AddCircleBlackIcon />}
          >
            Add
          </Button>
          <Button
            size="small"
            variant="contained"
            startIcon={<DesignPenIcon />}
          >
            Design card
          </Button>
        </Box>
      )}
    </Box>
  );
};
