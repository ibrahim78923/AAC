import { StatusAwayIcon, StatusEditIcon } from '@/assets/icons';
import { SwitchBtn } from '@/components/SwitchButton';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MouseOverPopover from './MouseOverPopover';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
export const mockData = (newAgentAdded: any) => {
  const data = [
    {
      id: '1',
      status: 'Available',
      enabled: true,
      actions:
        'When the agents are on Available conversation will be assigned to them',
    },
    {
      id: '2',
      status: 'Away',
      enabled: true,
      actions:
        'When the agents are on Available conversation will be assigned to them',
    },
    {
      id: '3',
      status: 'Ongoing call',
      enabled: true,
      actions:
        'When the agents are on Available conversation will be assigned to them',
    },
    {
      id: '4',
      status: 'After call work',
      enabled: true,
      actions:
        'When the agents are on Available conversation will be assigned to them',
    },
  ];

  if (newAgentAdded) {
    data.push({
      id: '5',
      status: 'Presenting',
      enabled: false,
      actions: '',
    });
  }

  return data;
};

export const agentStatusTableColumns = (
  handleEdit: any,
  newAgentAdded: any,
  setOpenAlertModal: any,
  handleOpenEditNewAgentStatus: any,
) => {
  return [
    {
      accessorFn: (row: any) => row?.status,
      id: 'status',
      cell: (info: any) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {info?.getValue() === 'After call work' ? (
              <>
                <StatusAwayIcon />
                <Box sx={{ ml: '12px' }}>{info?.getValue()}</Box>
                <Box sx={{ mx: '8px', fontSize: '11px' }}>
                  configured for 30 seconds
                </Box>
                <Box
                  sx={{ display: 'inline-flex', cursor: 'pointer' }}
                  onClick={handleEdit}
                >
                  <StatusEditIcon />
                </Box>
              </>
            ) : (
              <>
                <StatusAwayIcon />
                <Box sx={{ ml: '12px' }}>{info?.getValue()}</Box>
              </>
            )}
          </Box>
        );
      },
      header: 'Status Name',
    },
    {
      accessorFn: (row: any) => row?.enabled,
      id: 'enabled',
      isSortable: true,
      header: 'Enabled',
      cell: (info: any) => {
        return <SwitchBtn checked={info?.getValue()} />;
      },
    },
    {
      accessorFn: (row: any) => row?.actions,
      id: 'actions',
      isSortable: true,
      header: 'Actions',
      cell: (info: any) => {
        return (
          <>
            {newAgentAdded && info?.row?.original?.actions === '' ? (
              <MenuTableOpen
                handleOpenEditNewAgentStatus={handleOpenEditNewAgentStatus}
                setOpenAlertModal={setOpenAlertModal}
              />
            ) : (
              <MouseOverPopover
                id={info?.cell?.row?.original?.id}
                description={info?.getValue()}
              />
            )}
          </>
        );
      },
    },
  ];
};
const MenuTableOpen = ({
  handleOpenEditNewAgentStatus,
  setOpenAlertModal,
}: any) => {
  const [anchorTable, setAnchorTable] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: any) => {
    setAnchorTable(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorTable(null);
  };
  const actionTableMenuOpen = Boolean(anchorTable);
  return (
    <>
      <IconButton onClick={handleOpenMenu}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        sx={{
          '& .MuiMenu-list': {
            pb: 0,
            pt: 0,
          },
        }}
        anchorEl={anchorTable}
        open={actionTableMenuOpen}
        onClose={handleCloseMenu}
        id="basic-menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        PaperProps={{}}
      >
        <MenuItem onClick={handleOpenEditNewAgentStatus}>Edit status </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenAlertModal?.(true);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};
