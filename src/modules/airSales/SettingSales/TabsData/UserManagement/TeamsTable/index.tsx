import { Box, Grid, Typography } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';
import useTeamsTable from './useTeamsTable';
import { styles } from './TeamsTable.style';
import MemberDetails from './MemberDetails';
import { v4 as uuidv4 } from 'uuid';

const TeamsTable = () => {
  const {
    isTeamDrawer,
    setIsTeamDrawer,
    getRowValues,
    theme,
    isOpenDelete,
    setIsOpenDelete,
    teamsData,
    teamDataById,
  } = useTeamsTable();

  return (
    <>
      <Box>
        <Box
          sx={{
            marginTop: '1rem',
            marginBottom: '1rem',
          }}
        >
          <Search
            searchBy=""
            width="260px"
            label={'Search here'}
            setSearchBy={() => {}}
          />
        </Box>

        <Grid sx={{ paddingTop: '1rem' }}>
          <TanstackTable
            columns={getRowValues}
            data={teamsData?.data?.userTeams}
            isPagination
          />
        </Grid>
      </Box>

      {/* teams view detail drawer  */}
      <CommonDrawer
        isDrawerOpen={isTeamDrawer}
        onClose={() => setIsTeamDrawer(false)}
        title={teamDataById?.data?.name}
        okText={'Add'}
        footer={true}
        isOk={true}
      >
        <>
          <Box sx={styles?.activeMemberBox(theme)}>
            <Typography>Number of active Team Members</Typography>
            <Typography>{teamDataById?.data?.users?.length}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginY: '1.5rem',
              paddingX: '5px',
            }}
          >
            <Typography>Members detail</Typography>
            <AddCircle sx={{ color: '#A0A3BD', cursor: 'pointer' }} />
          </Box>
          {teamDataById?.data?.users?.length === 0 && (
            <Typography
              variant="body2"
              textAlign="center"
              mt={5}
              fontWeight={500}
              color={theme?.palette?.grey[500]}
            >
              No Member Found
            </Typography>
          )}

          {teamDataById?.data?.users?.map((item: any) => (
            <MemberDetails
              key={uuidv4()}
              img={item?.img}
              name={item?.name}
              email={item?.email}
              designation={item?.designation}
            />
          ))}
        </>
      </CommonDrawer>
      <AlertModals
        message={'Are you sure you want to delete this team?'}
        type={'delete'}
        open={isOpenDelete}
        submitBtnText="Delete"
        cancelBtnText="Cancel"
        handleClose={() => setIsOpenDelete(false)}
        handleSubmitBtn={() => {
          setIsOpenDelete(false);
        }}
      />
    </>
  );
};

export default TeamsTable;
