import { PageTitledHeader } from '@/components/PageTitledHeader';
import Search from '@/components/Search';
import { SingleDropdownButton } from '@/components/Buttons/SingleDropdownButton';
import { Box } from '@mui/material';
import { useResponsesList } from './useResponsesList';
import { AIR_SERVICES } from '@/constants/routes';
import { AddResponseForm } from './AddResponseForm';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { Permissions } from '@/constants/permissions';
import { AddNewItemButton } from '@/components/Buttons/AddNewItemButton';
import { CANNED_RESPONSES } from '@/constants/strings';
import { ResponseListView } from './ResponseListView';

export const ResponsesList = () => {
  const {
    setSelectedData,
    setPage,
    page,
    selectedData,
    folderName,
    router,
    handleSearch,
    isPortalOpen,
    setIsPortalOpen,
    responsesListActions,
    openAddResponsePortal,
    search,
  } = useResponsesList();

  return (
    <>
      <PageTitledHeader
        title={`Canned Response > ${folderName} Responses`}
        canMovedBack
        moveBack={() => router?.push(AIR_SERVICES?.CANNED_RESPONSE_SETTINGS)}
      />

      <Box
        borderRadius={3}
        border="1px solid"
        borderColor="custom.light_lavender_gray"
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 2,
            p: 1.2,
          }}
        >
          <PermissionsGuard
            permissions={[
              AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
            ]}
          >
            <Box>
              <Search label="Search Here" setSearchBy={handleSearch} />
            </Box>
          </PermissionsGuard>

          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            flexWrap="wrap"
            gap={2}
          >
            <PermissionsGuard
              permissions={
                Permissions?.AIR_SERVICES_SETTINGS_AGENT_PERFORMANCE_MANAGEMENT_CANNED_RESPONSES_LIST
              }
            >
              <SingleDropdownButton
                dropdownOptions={responsesListActions}
                disabled={!!!selectedData?.length}
              />
            </PermissionsGuard>
            <PermissionsGuard
              permissions={[
                AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.ADD_NEW_RESPONSES_IN_DIFFERENT_FOLDERS,
              ]}
            >
              <AddNewItemButton
                iconType="square"
                size="medium"
                name="Add New"
                onClick={openAddResponsePortal}
              />
            </PermissionsGuard>
          </Box>
        </Box>

        <PermissionsGuard
          permissions={[
            AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.VIEW_RESPONSES_LIST,
          ]}
        >
          <ResponseListView
            setSelectedData={setSelectedData}
            setPage={setPage}
            page={page}
            selectedData={selectedData}
            search={search}
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
          />
        </PermissionsGuard>
      </Box>
      {isPortalOpen?.isOpen &&
        isPortalOpen?.action === CANNED_RESPONSES?.EDIT && (
          <AddResponseForm
            isPortalOpen={isPortalOpen}
            setIsPortalOpen={setIsPortalOpen}
            folderName={folderName}
            selectedData={selectedData}
            setSelectedData={setSelectedData}
          />
        )}
    </>
  );
};
