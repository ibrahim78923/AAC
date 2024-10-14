import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/SingleDropdownButton';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { Box } from '@mui/material';
import { useHeader } from './useHeader';
import { loyaltyProgramRoleAndRightsActionComponent } from './Header.data';

export const Header = () => {
  const {
    roleAndRightsActionDropdown,
    openAddRoleAndRightsPortal,
    handleSetSearch,
    selectedRoleAndRightsLists,
    isPortalOpen,
  } = useHeader();

  return (
    <>
      <Box px={2}>
        <PageTitledHeader
          title="Roles and Rights"
          addTitle="Add new Role"
          handleAction={openAddRoleAndRightsPortal}
          createPermissionKey={[]}
        />
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          gap={2}
          flexWrap={'wrap'}
        >
          {' '}
          <Box>
            <Search
              label="Search Here"
              setSearchBy={handleSetSearch}
              size="small"
            />
          </Box>
          <SingleDropdownButton
            dropdownOptions={roleAndRightsActionDropdown}
            disabled={!!!selectedRoleAndRightsLists?.length}
          />
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        loyaltyProgramRoleAndRightsActionComponent?.[isPortalOpen?.action]}
    </>
  );
};
