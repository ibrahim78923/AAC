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

import {
  agentColumns,
  columns,
  conversationColumns,
} from './TableSection.data';
import {
  AllAgentData,
  InConversationData,
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
    <Grid container spacing={2} mt={2}>
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
            In Conversation ( 03 )
          </Typography>
        </Box>
        <Grid sx={{ paddingTop: '.5rem' }}>
          <TanstackTable
            columns={conversationColumns}
            data={InConversationData}
          />
        </Grid>
      </Grid>
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
              padding: '0px',
              height: '32px',
            }}
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
        <Grid>
          <TanstackTable columns={agentColumns} data={AllAgentData} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TableSection;
