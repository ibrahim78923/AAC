import { CirclePlusIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { Box, Button } from '@mui/material';
import { useUser } from '../useUser';

export const UserHeader = ({ selectedUserList }: any) => {
  const { setSearchValue } = useUser();
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
          disabled={!!!selectedUserList?.length}
        />
        <Button startIcon={<CirclePlusIcon />} variant="contained">
          Add User
        </Button>
      </Box>
    </Box>
  );
};
