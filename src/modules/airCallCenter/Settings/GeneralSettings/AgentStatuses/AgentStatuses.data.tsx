import { StatusAwayIcon, StatusEditIcon } from '@/assets/icons';
import { SwitchBtn } from '@/components/SwitchButton';
import { Box } from '@mui/material';
import MouseOverPopover from './MouseOverPopover';

export const mockData = [
  {
    id: '1',
    status: 'Available',
    enabled: true,
    actions:
      'When the  agents are on Available conversation will be assigned to them',
  },
  {
    id: '2',
    status: 'Away',
    enabled: true,
    actions:
      'When the  agents are on Available conversation will be assigned to them',
  },
  {
    id: '3',
    status: 'Ongoing call',
    enabled: true,
    actions:
      'When the  agents are on Available conversation will be assigned to them',
  },
  {
    id: '3',
    status: 'After call work',
    enabled: true,
    actions:
      'When the  agents are on Available conversation will be assigned to them',
  },
];

export const agentStatusTableColumns = (handleEdit: any) => {
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
          <MouseOverPopover
            id={info?.cell?.row?.original?.id}
            description={info?.getValue()}
          />
        );
      },
    },
  ];
};
