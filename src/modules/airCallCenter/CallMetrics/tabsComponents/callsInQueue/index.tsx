import { Box } from '@mui/material';
import React from 'react';
import { useCallINQueue } from './useCallInQueue';
import Search from '@/components/Search';
import { Button, Menu, MenuItem } from '@mui/material';

import { DownIcon } from '@/assets/icons';
import TanstackTable from '@/components/Table/TanstackTable';

import PowerDialerDialog from '../PowerDialerDialog';
import { allCallsData } from './CallsInQueue.data';

const CallsInQueue = () => {
  const styles = {
    actionBtn: (theme: any) => ({
      color: theme?.palette?.grey[500],
      width: '160px',
      border: `1.5px solid ${theme?.palette?.custom?.border_grayish_blue}`,
      marginLeft: '10px',
      '@media (max-width:560px)': {
        width: '100%',
      },
    }),
  };
  const {
    setSearchTerm,
    handleActionsClick,
    handleClose,

    actionMenuOpen,
    anchorEl,
    setAnchorEl,
    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    startPowerDialerModal,
    setStartPowerDialerModal,
  } = useCallINQueue();

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mb={4}
      >
        <Search label="Search Here" setSearchBy={setSearchTerm} />
        <Button
          id="basic-button"
          aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={actionMenuOpen ? 'true' : undefined}
          onClick={handleActionsClick}
          sx={styles?.actionBtn}
          className="small"
        >
          Select queues &nbsp; <DownIcon />
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={actionMenuOpen}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            style: {
              width: '160px',
            },
          }}
        >
          <MenuItem onClick={() => setAnchorEl(null)}>Global</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Uk Support</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>Call Back</MenuItem>
          <MenuItem onClick={() => setAnchorEl(null)}>First call</MenuItem>
        </Menu>
      </Box>
      <TanstackTable
        columns={getColumns}
        data={allCallsData}
        setPage={setPage}
        setPageLimit={setPageLimit}
        isPagination
        // isLoading={isLoading}
        currentPage={page}
        // count={Calls?.meta?.total}
        pageLimit={pageLimit}
        // totalRecords={Calls?.meta?.total}
        // isSuccess={true}
        // onPageChange={(page: any) => setPage(page)}
      />
      <PowerDialerDialog
        powerDialerModal={startPowerDialerModal}
        setPowerDialerModal={setStartPowerDialerModal}
      />
    </>
  );
};

export default CallsInQueue;
