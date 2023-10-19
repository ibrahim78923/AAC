import { Button, Grid, useTheme } from '@mui/material';
import { AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { styles } from '../../Contracts.style';

export const ContractsHeader = () => {
  const theme = useTheme();
  return (
    <>
      <Grid container sx={styles.headerContainer} spacing={2}>
        <Grid item>
          <Search label="Search" searchBy="" setSearchBy="" />
        </Grid>
        <Grid item>
          <Button
            startIcon={<AddCircleBlackIcon />}
            sx={styles.headerAddBtn(theme)}
          >
            Create New Contract
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
