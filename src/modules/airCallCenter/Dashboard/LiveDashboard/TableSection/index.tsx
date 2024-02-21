import React from 'react';

import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { agentColumns, columns } from './TableSection.data';
import {
  AllAgentData,
  InQueueData,
} from '@/mock/modules/airCallCenter/Dashboard';
import { DownIcon } from '@/assets/icons';
import useTableSection from './useTableSection';

const TableSection = () => {
  const theme = useTheme<Theme>();
  const {
    anchorEl,
    setAnchorEl,
    actionMenuOpen,
    handleActionsClick,
    handleClose,
  } = useTableSection();

  return (
    <Grid container mt={2}>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: `${theme?.palette?.custom?.dark_blue}`,
            }}
          >
            In Queue ( 4 )
          </Typography>
        </Box>
        <Grid sx={{ paddingTop: '.5rem' }}>
          <TanstackTable columns={columns} data={InQueueData} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={4}></Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          <Button
            id="basic-button"
            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={actionMenuOpen ? 'true' : undefined}
            onClick={handleActionsClick}
            sx={{
              color: `${theme?.palette?.custom?.dark_blue}`,
              fontWeight: '400',
              fontSize: '16px',
            }}
            className="small"
          >
            All Agent &nbsp; <DownIcon />
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
                width: '240px',
              },
            }}
          >
            <MenuItem onClick={() => setAnchorEl(null)}>All available</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>available</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>busy</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              after call work
            </MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>offline</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>
              available on other channel
            </MenuItem>
          </Menu>
        </Box>
        <Grid sx={{ paddingTop: '.5rem' }}>
          <TanstackTable columns={agentColumns} data={AllAgentData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TableSection;
