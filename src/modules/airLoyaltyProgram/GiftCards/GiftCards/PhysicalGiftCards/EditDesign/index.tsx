import { Box, useTheme } from '@mui/material';
import { Header } from './Header';
import { EditPhysicalCard } from './EditPhysicalCard';

export const EditDesign = () => {
  const theme = useTheme();
  return (
    <Box bgcolor={theme?.palette?.grey[100]} height={'100%'}>
      <Header />
      <EditPhysicalCard />
    </Box>
  );
};
