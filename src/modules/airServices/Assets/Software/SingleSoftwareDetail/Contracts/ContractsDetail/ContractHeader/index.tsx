import { Button, Grid, useTheme } from '@mui/material';
import { AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { ContractsStyle } from '../../Contracts.style';

export const ContractsHeader = () => {
  const theme = useTheme();
  const styles = ContractsStyle(theme);
  return (
    <>
      <Grid container sx={styles[0].headerContainer} spacing={2}>
        <Grid item>
          <Search label="Search" searchBy="" setSearchBy="" />
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddCircleBlackIcon />}
            sx={styles[0].headerAddBtn}
          >
            Create New Contract
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
