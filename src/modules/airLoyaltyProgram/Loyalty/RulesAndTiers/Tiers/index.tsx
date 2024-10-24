import Search from '@/components/Search';
import { useTiers } from './useTiers';
import { Box } from '@mui/material';
import { TiersList } from './TiersList';

export const Tiers = () => {
  const { handleSetSearch } = useTiers();

  return (
    <Box
      border={1}
      borderColor="custom.off_white_three"
      borderRadius={2}
      boxShadow={1}
    >
      <Box p={2}>
        <Search label="Search Here" setSearchBy={handleSetSearch} />
      </Box>
      <TiersList />
    </Box>
  );
};
