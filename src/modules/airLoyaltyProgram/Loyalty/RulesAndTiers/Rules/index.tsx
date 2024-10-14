import Search from '@/components/Search';
import { RulesList } from './RulesList';
import { useRules } from './useRules';
import { Box } from '@mui/material';

export const Rules = () => {
  const { handleSetSearch } = useRules();
  return (
    <Box
      border={1}
      borderColor="custom.off_white_three"
      borderRadius={2}
      boxShadow={1}
    >
      <Box p={2}>
        <Search label="Search here" setSearchBy={handleSetSearch} />
      </Box>
      <RulesList />
    </Box>
  );
};
