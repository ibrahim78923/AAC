import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { Box } from '@mui/material';
import React from 'react';
import useTeams from './useTeams';
import { styles } from './Teams.styles';
import { usersMockData } from './Teams.data';
import { AlertModals } from '@/components/AlertModals';
import AddTeams from '../AddTeams';
import ViewTeams from './ViewTeams';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_USER_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

const Teams = (props: any) => {
  const {
    getColumns,
    search,
    setSearch,
    setPageLimit,
    setPage,
    isDeleteModal,
    setIsDeleteModal,
    handleDelete,
    openDrawerAddTeams,
    handleCloseDrawerAddTeams,
    methodsAddTeams,
    handleAddTeamsSubmits,
    addTeamDrawer,
    isTeamDrawerOpen,
    setIsTeamDrawerOpen,
    teamByIdLoading,
  } = useTeams(props);
  return (
    <Box>
      <Box>
        <Box sx={styles?.filterBar}>
          <Box sx={styles?.search}>
            <Search
              label="search"
              searchBy={search}
              setSearchBy={setSearch}
              placeholder="Search Here"
              size="small"
              width={'100%'}
            />
          </Box>
        </Box>
      </Box>
      <PermissionsGuard
        permissions={[
          AIR_CALL_CENTER_USER_MANAGEMENT_PERMISSIONS?.TEAM_GRID_VIEW,
        ]}
      >
        <TanstackTable
          columns={getColumns}
          data={usersMockData}
          isPagination
          setPage={setPage}
          setPageLimit={setPageLimit}
        />
      </PermissionsGuard>
      <AlertModals
        type="delete"
        open={isDeleteModal}
        message="Are you sure you want to delete this record?"
        handleClose={() => setIsDeleteModal(false)}
        handleSubmitBtn={handleDelete}
      />
      <AddTeams
        isDrawerOpen={openDrawerAddTeams}
        onClose={handleCloseDrawerAddTeams}
        formMethods={methodsAddTeams}
        handleSubmit={handleAddTeamsSubmits}
        addTeamDrawer={addTeamDrawer}
      />
      <ViewTeams
        isTeamDrawer={isTeamDrawerOpen}
        setIsTeamDrawer={setIsTeamDrawerOpen}
        teamData={usersMockData}
        teamByIdLoading={teamByIdLoading}
      />
    </Box>
  );
};

export default Teams;
