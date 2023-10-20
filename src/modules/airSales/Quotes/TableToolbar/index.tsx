import React, { FC } from 'react';
import { Box, Button, Menu, MenuItem, Stack } from '@mui/material';
import Search from '@/components/Search';
import {
  CustomizeIcon,
  DropdownIcon,
  FilterSharedIcon,
  RefreshSharedIcon,
} from '@/assets/icons';
import useQuotes from '../useQuotes';
import { TableToolbarI } from './TableToolbar.interface';
import { styles } from './TableToolbar.style';

const TableToolbar: FC<TableToolbarI> = ({
  handleFilters,
  handleCustomizeColumns,
  handleResetFilters,
  handleEditQuote,
  handleViewQuote,
  handleOpenDeleteQuote,
}) => {
  const {
    actionsEl,
    openActionsDropdown,
    handleActionsDropdown,
    handleActionsDropdownClose,
  } = useQuotes();

  return (
    <Box sx={styles.tableToolbar}>
      <Box>
        <Search size="small" />
      </Box>
      <Stack direction={'row'} spacing={'8px'}>
        <Box>
          <Button
            className="small"
            sx={styles.actionButton}
            endIcon={<DropdownIcon />}
            onClick={handleActionsDropdown}
          >
            Actions
          </Button>
          <Menu
            anchorEl={actionsEl}
            open={openActionsDropdown}
            onClose={handleActionsDropdownClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiList-root': {
                minWidth: '112px',
              },
            }}
          >
            <MenuItem onClick={handleEditQuote}>Edit</MenuItem>
            <MenuItem onClick={handleViewQuote}>View</MenuItem>
            <MenuItem onClick={handleOpenDeleteQuote}>Delete</MenuItem>
          </Menu>
        </Box>
        <Button
          className="small"
          sx={styles.actionButton}
          onClick={handleResetFilters}
        >
          <RefreshSharedIcon />
        </Button>
        <Button
          className="small"
          sx={styles.actionButton}
          startIcon={<CustomizeIcon />}
          onClick={handleCustomizeColumns}
        >
          Customize
        </Button>
        <Button
          className="small"
          sx={styles.actionButton}
          startIcon={<FilterSharedIcon />}
          onClick={handleFilters}
        >
          Filter
        </Button>
      </Stack>
    </Box>
  );
};

export default TableToolbar;
