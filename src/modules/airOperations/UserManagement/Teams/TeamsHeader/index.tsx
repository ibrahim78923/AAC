import { CirclePlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { useTeams } from '../useTeams';
import UpsertTeams from '../UpsertTeams';
import { AgentConversionDelete } from '../../AgentConversionDelete';

export const TeamsHeader = () => {
  const {
    setSearchValue,
    isDrawerOpen,
    setIsDrawerOpen,
    deleteModal,
    setDeleteModal,
  } = useTeams();
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
        <AgentConversionDelete
          message={'Are you sure you want to delete this Team?'}
          open={deleteModal}
          handleClose={() => {
            setDeleteModal(false);
          }}
        />
      </Box>
    </Box>
  );
};
