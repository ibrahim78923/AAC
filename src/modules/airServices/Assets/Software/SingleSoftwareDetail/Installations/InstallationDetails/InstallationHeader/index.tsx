import { Button, Grid, useTheme } from '@mui/material';
import { ExportBlackIcon, AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';

export const InstallationHeader = ({ activeCheck }: any) => {
  const theme = useTheme();
  return (
    <Grid container justifyContent={'space-between'} px={2}>
      <Grid item xs={9}>
        <Search label="Search" searchBy="" setSearchBy="" />
      </Grid>
      <Grid item xs={3} border={'1px solid'}>
        <Button
          disabled={!!!activeCheck}
          sx={{
            bgcolor: 'transparent',
            border: `1px solid ${theme.palette.grey[700]}`,
            p: '18px',
          }}
        >
          Remove Device
        </Button>
        <Button
          startIcon={<ExportBlackIcon />}
          sx={{
            color: theme.palette.slateBlue.main,
            ':hover': { bgcolor: 'transparent' },
          }}
        >
          Export
        </Button>
        <Button
          startIcon={<AddCircleBlackIcon />}
          sx={{
            color: theme.palette.slateBlue.main,
            ':hover': { bgcolor: 'transparent' },
          }}
        >
          Add Device
        </Button>
      </Grid>
    </Grid>
  );
};
