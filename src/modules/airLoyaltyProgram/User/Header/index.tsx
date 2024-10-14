import Search from '@/components/Search';
import { Box, Button } from '@mui/material';
import { AddWhiteBgIcon } from '@/assets/icons';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { useHeader } from './useHeader';
import { loyaltyProgramUsersActionComponent } from './Header.data';

export const Header = () => {
  const {
    actionsDropdownForLoyaltyProgramUser,
    openAddUserPortal,
    handleSetSearch,
    selectedUsersLists,
    isPortalOpen,
  } = useHeader();

  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={2}
        flexWrap={'wrap'}
      >
        <Box>
          <Search label="Search Here" setSearchBy={handleSetSearch} />
        </Box>
        <Box display={'flex'} gap={2} alignItems={'center'} flexWrap={'wrap'}>
          <SingleDropdownButton
            dropdownOptions={actionsDropdownForLoyaltyProgramUser}
            disabled={!!!selectedUsersLists?.length}
          />
          <Button
            className="small"
            variant="contained"
            startIcon={<AddWhiteBgIcon />}
            onClick={openAddUserPortal}
          >
            Add User
          </Button>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        loyaltyProgramUsersActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
