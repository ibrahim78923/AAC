import { CirclePlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useTeams } from '../useTeams';

export const TeamsHeader = ({ selectedTeamList }: any) => {
  const { setSearchValue } = useTeams();
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      flexWrap={'wrap'}
      alignItems={'center'}
    >
      <Box>
        <Search
          label="Search Here"
          width={'16.25rem'}
          setSearchBy={setSearchValue}
        />
      </Box>
      <Box display={'flex'} gap={1} mt={{ xs: 2, sm: 0 }}>
        <SingleDropdownButton
          dropdownName={'Actions'}
          disabled={!selectedTeamList?.length}
        />
        <Button startIcon={<CirclePlusIcon />} variant="contained">
          Create Team
        </Button>
      </Box>
    </Box>
  );
};
