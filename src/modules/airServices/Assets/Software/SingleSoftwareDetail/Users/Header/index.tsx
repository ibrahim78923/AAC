import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { ExportButton } from '@/components/Buttons/ExportButton';
import { PublicSingleDropdownButton } from '@/components/Buttons/PublicSingleDropdownButton';
import Search from '@/components/Search';
import { Box } from '@mui/material';
import { UsersAdd } from '../UsersAdd';
import { SOFTWARE_USER_PORTAL_ACTIONS_TYPES } from '../Users.data';
import { AllocateContract } from '../AllocateContract';
import { DeallocateContract } from '../DeallocateContract';
import { useHeader } from './useHeader';
import { CustomButton } from '@/components/Buttons/CustomButton';

export const Header = (props: any) => {
  const { isPortalOpen, setIsPortalOpen, usersData, setUsersData } = props;
  const {
    userActionDropdown,
    openAddUserPortal,
    openFilterPortal,
    exportAsCsv,
    exportAsXls,
    handleSearch,
  } = useHeader(props);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box ml={0.5}>
          <Search label="Search Here" setSearchBy={handleSearch} />
        </Box>
        <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'} gap={2}>
          <PublicSingleDropdownButton
            dropdownOptions={userActionDropdown}
            disabled={!usersData?.length}
          />

          <AddNewItemButton name="Add User" onClick={openAddUserPortal} />
          <ExportButton
            handleCsvExport={exportAsCsv}
            handleExcelExport={exportAsXls}
          />
          <CustomButton onClick={openFilterPortal}>Filter</CustomButton>
        </Box>
      </Box>
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.ADD && (
          <UsersAdd
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setUsersData={setUsersData}
            usersData={usersData}
          />
        )}
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action ===
          SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.ALLOCATE && (
          <AllocateContract
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setUsersData={setUsersData}
            usersData={usersData}
          />
        )}
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action ===
          SOFTWARE_USER_PORTAL_ACTIONS_TYPES?.DEALLOCATE && (
          <DeallocateContract
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            setUsersData={setUsersData}
            usersData={usersData}
          />
        )}
    </>
  );
};
