import { CirclePlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import UpsertTeams from '../UpsertTeams';

export const TeamsHeader = ({
  setSearch,
  isDrawerOpen,
  setIsDrawerOpen,
}: any) => {
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
          setSearchBy={setSearch}
        />
      </Box>
      <Box display={'flex'} gap={1} mt={{ xs: 2, sm: 0 }}>
        <Button
          startIcon={<CirclePlusIcon />}
          variant="contained"
          onClick={() => {
            setIsDrawerOpen(true);
          }}
        >
          Create Team
        </Button>
        <UpsertTeams
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          title={'Create Team'}
          okText={'Add'}
        />
      </Box>
    </Box>
  );
};
