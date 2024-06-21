import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import TanstackTable from '@/components/Table/TanstackTable';

import TicketsEditorDrawer from './TicketsEditorDrawer';

// import { TasksTableData } from '@/mock/modules/airSales/Deals/ViewDetails';

import useTickets from './useTickets';

import { columns } from './Tickets.data';

import { styles } from '../Associations.style';
import { PlusIcon } from '@/assets/icons';

const Tickets = ({ contactId }: any) => {
  const {
    theme,
    setSearchValue,
    loadingTickets,
    dataGetTickets,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,

    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    handleRemoveAssociation,
    loadingPostAssociation,
  } = useTickets(contactId);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        {loadingTickets && (
          <Grid item xs={12} sx={styles?.countBox}>
            <Skeleton animation="wave" width="100%" height={60} />
          </Grid>
        )}
        {!loadingTickets && (
          <>
            <Grid item md={4} sx={styles?.countBox}>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {dataGetTickets?.length < 10
                  ? `0${dataGetTickets?.length}`
                  : dataGetTickets?.length}
              </Typography>

              <Typography variant="subtitle2">Tickets</Typography>
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
                  setSearchBy={setSearchValue}
                  label="Search By Name"
                  size="small"
                />
                <Button
                  variant="contained"
                  className="small"
                  sx={{ minWidth: '0px', gap: 0.5 }}
                  onClick={() => handleOpenDrawer('Add', {})}
                >
                  <PlusIcon /> Add Ticket
                </Button>
              </Box>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TanstackTable
            columns={columns({ handleOpenDrawer, handleOpenAlert })}
            data={dataGetTickets}
            isLoading={loadingTickets}
          />
        </Grid>
      </Grid>

      <TicketsEditorDrawer
        drawerTitle={drawerTitle}
        open={openDrawer}
        onClose={handleCloseDrawer}
      />

      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleRemoveAssociation}
        loading={loadingPostAssociation}
      />
    </Box>
  );
};

export default Tickets;
