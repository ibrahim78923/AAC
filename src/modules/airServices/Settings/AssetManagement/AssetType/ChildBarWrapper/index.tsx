import { AddBox } from '@mui/icons-material';
import { Box, Button, useTheme } from '@mui/material';

const ChildBarWrapper = ({ children, isZeroBoxShadow = false }: any) => {
  const { palette }: any = useTheme();
  return (
    <Box
      display={'flex'}
      flexDirection="column"
      gap={1.8}
      borderRadius={3}
      py={2.4}
      px={'5%'}
      boxShadow={isZeroBoxShadow ? 0 : 2}
      sx={{
        background: palette?.custom?.light_grayish_blue + 80,
      }}
    >
      {children}
      <Box>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mr: 5 }}
          startIcon={<AddBox />}
        >
          Add New Services
        </Button>
      </Box>
    </Box>
  );
};

export default ChildBarWrapper;
