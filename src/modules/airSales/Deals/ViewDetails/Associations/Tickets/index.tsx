import { Box, Button, Grid, Typography } from '@mui/material';

import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import TicketsEditorDrawer from './TicketsEditorDrawer';
import TanstackTable from '@/components/Table/TanstackTable';

import useTickets from './useTickets';

import { columns } from './Tickets.data';

import { TasksTableData } from '@/mock/modules/airSales/Deals/ViewDetails';

import { PlusIcon } from '@/assets/icons';

import { styles } from '../Associations.style';

const Tickets = () => {
  const {
    theme,
    isOpenAlert,
    setIsOpenAlert,
    searchName,
    setSearchName,
    openDrawer,
    setOpenDrawer,
    handleCloseAlert,
  } = useTickets();

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

          <Typography variant="h5">Tickets</Typography>
        </Grid>
        <Grid item md={8} xs={12}>
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
              size="medium"
            />
            <Button
              variant="contained"
              className="medium"
              sx={{ minWidth: '0px', gap: 0.5 }}
              onClick={() => setOpenDrawer('Add')}
            >
              <PlusIcon /> Add Tickets
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ setOpenDrawer, setIsOpenAlert })}
            data={TasksTableData}
          />
        </Grid>
      </Grid>
      <TicketsEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
      <AlertModals
        message={"You're about to remove a record. Are you sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmit={() => {}}
      />
    </Box>
  );
};

export default Tickets;
