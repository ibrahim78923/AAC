import React from 'react';

import Image from 'next/image';

import { Box, Button, Grid, Menu, MenuItem, Typography } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AddCircle } from '@mui/icons-material';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import CustomPagination from '@/components/CustomPagination';
import CommonDrawer from '@/components/CommonDrawer';
import { AlertModals } from '@/components/AlertModals';

import { teamsTableData } from '@/mock/modules/airSales/SettingSales';

import useTeamsTable from './useTeamsTable';
import { styles } from './TeamsTable.style';
import { memberDetails } from './TeamsTable.data';
import { v4 as uuidv4 } from 'uuid';

const TeamsTable = () => {
  const {
    isTeamDrawer,
    setIsTeamDrawer,
    getRowValues,
    theme,
    anchorEl,
    open,
    handleClose,
    handleClick,
    isOpenDelete,
    setIsOpenDelete,
  } = useTeamsTable();

  return (
    <>
      <Box>
        <Search
          searchBy=""
          width="100%"
          label={'Search here'}
          setSearchBy={() => {}}
        />
        <Grid sx={{ paddingTop: '1rem' }}>
          <TanstackTable columns={getRowValues} data={teamsTableData} />
          <CustomPagination
            count={1}
            rowsPerPageOptions={[1, 2]}
            entriePages={1}
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
          {memberDetails?.map((items: any) => {
            return (
              <Box
                key={uuidv4()}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: `1px solid ${theme?.palette?.custom?.off_white_three}`,
                  paddingBottom: '1rem',
                  marginY: '1rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <Image src={items?.img} alt="--" width={40} height={40} />
                  <Box sx={{ display: 'grid' }}>
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: 500,
                        color: `${theme?.palette?.blue?.dull_blue}`,
                      }}
                    >
                      {items?.name}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: 400,
                        color: `${theme?.palette?.custom?.steel_blue_alpha}`,
                      }}
                    >
                      {items?.email}
                    </Typography>
                    <Typography
                      variant="body3"
                      sx={{
                        fontWeight: 400,
                        color: `${theme?.palette?.custom?.steel_blue_alpha}`,
                      }}
                    >
                      {items?.designation}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                >
                  <KeyboardArrowDownIcon
                    sx={{ color: `${theme?.palette?.custom?.main}` }}
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsTeamDrawer(false);
                    }}
                  >
                    Details
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setIsTeamDrawer(false);
                      setIsOpenDelete(true);
                    }}
                  >
                    Delete
                  </MenuItem>
                </Menu>
              </Box>
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
