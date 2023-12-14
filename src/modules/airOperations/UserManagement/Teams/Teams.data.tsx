import { Box, Checkbox, Typography } from '@mui/material';
import { TeamListI } from './Teams.interface';
import { DeleteCrossIcon, EditPenIcon, ViewEyeIcon } from '@/assets/icons';

export const teamListData: TeamListI[] = [
  {
    id: 1,
    teamName: `Test`,
    teamMembers: 4,
    actions: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ cursor: 'pointer' }}>
          <ViewEyeIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
  {
    id: 2,
    teamName: `Test1`,
    teamMembers: 2,
    actions: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ cursor: 'pointer' }}>
          <ViewEyeIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
  {
    id: 3,
    teamName: `Orcalo`,
    teamMembers: 1,
    actions: (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box sx={{ cursor: 'pointer' }}>
          <ViewEyeIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <EditPenIcon />
        </Box>
        <Box sx={{ cursor: 'pointer' }}>
          <DeleteCrossIcon />
        </Box>
      </Box>
    ),
  },
];
export const teamList: any = (
  selectedTeamList: any,
  setSelectedTeamList: any,
  teamListData: any,
) => [
  {
    accessorFn: (row: any) => row?.id,
    id: 'id',
    cell: (info: any) => (
      <Checkbox
        color="primary"
        name={info?.getValue()}
        checked={
          !!selectedTeamList?.find((item: any) => item?.id === info?.getValue())
        }
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedTeamList([
                ...selectedTeamList,
                teamListData?.find(
                  (item: any) => item?.id === info?.getValue(),
                ),
              ])
            : setSelectedTeamList(
                selectedTeamList?.filter((item: any) => {
                  return item?.id !== info?.getValue();
                }),
              );
        }}
      />
    ),
    header: (
      <Checkbox
        color="primary"
        name="id"
        checked={selectedTeamList?.length === teamListData?.length}
        onChange={(e: any) => {
          e?.target?.checked
            ? setSelectedTeamList([...teamListData])
            : setSelectedTeamList([]);
        }}
      />
    ),
    isSortable: false,
  },
  {
    accessorFn: (row: any) => row?.teamName,
    id: 'teamName',
    isSortable: true,
    header: 'Team Name',
    cell: (info: any) => (
      <Typography variant="body4" color="blue.dull_blue">
        {info?.getValue()}
      </Typography>
    ),
  },
  {
    accessorFn: (row: any) => row?.teamMembers,
    id: 'teamMembers',
    isSortable: true,
    header: 'Team Members',
    cell: (info: any) => info?.getValue(),
  },
  {
    accessorFn: (row: any) => row?.actions,
    id: 'actions',
    isSortable: true,
    header: 'Action',
    cell: (info: any) => info?.getValue(),
  },
];
