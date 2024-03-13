import { Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CancelIcon from '@mui/icons-material/Cancel';
import { EditPenIcon } from '@/assets/icons';
import { RHFSelect, RHFTextField } from '@/components/ReactHookForm';
import { UserAvatarImage } from '@/assets/images';

export const columnsTeams = (props: any) => {
  const { setIsTeamDrawer, setIsOpenDelete, theme, setTeamId, setIsAddTeam } =
    props;
  return [
    {
      accessorFn: (row: any) => row?.name,
      id: 'name',
      cell: (info: any) => info?.getValue(),
      header: 'Name',
      isSortable: true,
    },
    {
      accessorFn: (row: any) => row?.teamMembers,
      id: 'teamMembers',
      isSortable: true,
      header: 'Team Member',
      cell: (info: any) => info?.getValue(),
    },
    {
      accessorFn: (row: any) => row?.action,
      id: 'action',
      isSortable: true,
      header: 'Action',
      cell: (info: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsTeamDrawer(true);
              setTeamId(info?.row?.original?._id);
            }}
          >
            <VisibilityIcon
              sx={{
                color: `${theme?.palette?.blue?.main}`,
                fontSize: '22px',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() =>
              setIsAddTeam({
                isToggle: true,
                type: 'edit',
              })
            }
          >
            <EditPenIcon />
          </Box>
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setIsOpenDelete(true);
              setTeamId(info?.row?.original?._id);
            }}
          >
            <CancelIcon
              sx={{
                color: `${theme?.palette?.error?.main}`,
                fontSize: '22px',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Box>
      ),
    },
  ];
};

export const teamsDataArray = [
  {
    componentProps: {
      name: 'teamName',
      label: 'Team Name',
      fullWidth: true,
      select: false,
      placeholder: 'Enter Team Name',
      required: true,
    },
    component: RHFTextField,
    md: 12,
  },
  {
    componentProps: {
      name: 'teamMembers',
      label: 'Team Members',
      fullWidth: true,
      select: true,
    },
    options: [
      { value: 'United Kingdom', label: 'A' },
      { value: 'United Kingdom', label: 'B' },
      { value: 'United Kingdom', label: 'C' },
    ],
    component: RHFSelect,
    md: 12,
  },
];

export const memberDetails: any = [
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'abc@gmail.com',
    designation: 'Graphic Designer',
  },
  {
    img: UserAvatarImage,
    name: 'Olivia Rhye',
    email: 'abc@gmail.com',
    designation: 'Graphic Designer',
  },
];
