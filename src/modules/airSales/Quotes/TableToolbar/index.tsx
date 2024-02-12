import React, { FC } from 'react';
import { Box, Button, Menu, MenuItem, Stack, Tooltip } from '@mui/material';
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
  setSearchValue,
  handleFilters,
  handleCustomizeColumns,
  handleResetFilters,
  handleEditQuote,
  handleViewQuote,
  handleOpenDeleteQuote,
  isActionsDisabled,
  rowId,
}) => {
  const {
    actionsEl,
    openActionsDropdown,
    handleActionsDropdown,
    handleActionsDropdownClose,
  } = useQuotes();

  return (
    <Box sx={styles?.tableToolbar}>
      <Box>
        <Search
          setSearchBy={setSearchValue}
          label="Search Here"
          size="small"
          width={'100%'}
        />
      </Box>
      <Stack
        direction={'row'}
        flexWrap={'Wrap'}
        spacing={'8px'}
        sx={{ marginTop: { xs: '5px', md: '15px', lg: '0px' } }}
      >
        <Box sx={{ width: { xs: '100%', sm: 'fit-Content' } }}>
          <Button
            className="small"
            sx={styles?.actionButton}
            endIcon={<DropdownIcon />}
            onClick={handleActionsDropdown}
            disabled={isActionsDisabled}
            style={{ width: '100%' }}
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
            <MenuItem disabled={!rowId} onClick={handleEditQuote}>
              Edit
            </MenuItem>
            <MenuItem disabled={!rowId} onClick={handleViewQuote}>
              View
            </MenuItem>
            <MenuItem onClick={handleOpenDeleteQuote}>Delete</MenuItem>
          </Menu>
        </Box>

        <Tooltip title={'Refresh Filter'} placement="top-start" arrow>
          <Button
            variant="outlined"
            color="inherit"
            className="small"
            onClick={handleResetFilters}
            sx={{
              width: { xs: '100%', sm: 'fit-Content' },
              marginTop: { xs: '10px !important', sm: '0px !important' },
              marginLeft: { xs: '0px !important', sm: '10px !important' },
            }}
          >
            <RefreshSharedIcon />
          </Button>
        </Tooltip>

        <Button
          className="small"
          sx={styles?.actionButton}
          startIcon={<CustomizeIcon />}
          onClick={handleCustomizeColumns}
        >
          Customize
        </Button>
        <Button
          className="small"
          sx={styles?.actionButton}
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
