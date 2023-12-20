import React from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { AddCircle } from '@mui/icons-material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import { teamsTableData } from '@/mock/modules/airSales/SettingSales';

import useTeamsTable from './useTeamsTable';
import { styles } from './TeamsTable.style';
import { memberDetails } from './TeamsTable.data';
import { v4 as uuidv4 } from 'uuid';
import MemberDetails from './MemberDetails';

const TeamsTable = () => {
  const {
    isTeamDrawer,
    setIsTeamDrawer,
    getRowValues,
    theme,
    isOpenDelete,
    setIsOpenDelete,
  } = useTeamsTable();

  return (
    <>
      <Box>
        <Search
          searchBy=""
          width="260px"
          label={'Search here'}
          setSearchBy={() => {}}
        />
        <Grid sx={{ paddingTop: '1rem' }}>
          <TanstackTable
            columns={getRowValues}
            data={teamsTableData}
            isPagination
          />
        </Grid>
      </Box>
      <CommonDrawer
        isDrawerOpen={isTeamDrawer}
        onClose={() => setIsTeamDrawer(false)}
        title=""
        okText={'Add'}
        footer={true}
        isOk={true}
      >
        <>
          <Box sx={{ position: 'absolute', top: 30 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: `${theme?.palette?.slateBlue?.main}`,
              }}
            >
              Test
            </Typography>
          </Box>
          <Box sx={styles?.activeMemberBox(theme)}>
            <Typography>Number of active Team Members</Typography>
            <Typography>4</Typography>
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
          {memberDetails?.map((item: any) => {
            return (
              <MemberDetails
                key={uuidv4()}
                img={item?.img}
                name={item?.name}
                email={item?.email}
                designation={item?.designation}
              />
            );
          })}
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
