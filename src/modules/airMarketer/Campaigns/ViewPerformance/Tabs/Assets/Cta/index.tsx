import { Box, Button, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';

import TanstackTable from '@/components/Table/TanstackTable';

import useProducts from './useProducts';

import { columns } from './Cta.data';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';
import { CtaData } from '@/mock/modules/airMarketer/Campaigns/Assets';

const Cta = () => {
  const {
    theme,

    setIsOpenAlert,
    searchName,
    setSearchName,

    setOpenDrawer,
  } = useProducts();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        <Grid item md={4} sx={styles?.countBox}>
          <Typography sx={styles?.associationCount(theme)} variant="body3">
            02
          </Typography>

          <Typography variant="subtitle2">CTA</Typography>
        </Grid>
        <Grid item md={8}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Search
              searchBy={searchName}
              setSearchBy={setSearchName}
              label="Search By Name"
              size="small"
            />
            <Button
              variant="contained"
              className="small"
              sx={{ minWidth: '0px', gap: 0.5 }}
            >
              <PlusIcon /> View all blog posts
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ setOpenDrawer, setIsOpenAlert })}
            data={CtaData}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Cta;
