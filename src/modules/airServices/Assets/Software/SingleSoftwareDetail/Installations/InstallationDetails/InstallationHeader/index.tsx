import { Button, Grid, useTheme, Popover, MenuItem } from '@mui/material';
import { ExportBlackIcon, AddCircleBlackIcon } from '@/assets/icons';
import Search from '@/components/Search';
import { AlertModals } from '@/components/AlertModals';
import { useInstallation } from '../../useInstallations';
import { styles } from '../../Installation.style';

const DELETE_MESSAGE = 'Are you sure you want to delete this Associate Asset?';
const MODAL_TYPE = 'delete';
export const InstallationHeader = ({ activeCheck }: any) => {
  const theme = useTheme();
  const {
    handleExportClick,
    handleExportClose,
    openExport,
    exportPop,
    deleteModal,
    setDeleteModal,
    submitDeleteModel,
    handleMenuExport,
  } = useInstallation();
  return (
    <>
      <Grid container sx={styles.headerContainer} spacing={2}>
        <Grid item>
          <Search label="Search" searchBy="" setSearchBy="" />
        </Grid>
        <Grid item sx={styles.headerItem}>
          <Button
            disabled={!!!activeCheck.length}
            sx={styles.headerRemoveBtn(theme)}
            onClick={() => setDeleteModal(true)}
          >
            Remove Device
          </Button>
          <Button
            startIcon={<ExportBlackIcon />}
            sx={styles.headerEaBtn(theme)}
            onClick={handleExportClick}
          >
            Export
          </Button>
          <Popover
            open={openExport}
            anchorEl={exportPop}
            onClose={handleExportClose}
            sx={styles.headerPop}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <MenuItem sx={{ py: 1 }} onClick={handleMenuExport}>
              CSV
            </MenuItem>
            <MenuItem sx={{ py: 1 }} onClick={handleMenuExport}>
              Excel
            </MenuItem>
          </Popover>
          <Button
            startIcon={<AddCircleBlackIcon />}
            sx={styles.headerEaBtn(theme)}
          >
            Add Device
          </Button>
        </Grid>
      </Grid>
      <AlertModals
        open={deleteModal}
        message={DELETE_MESSAGE}
        handleClose={() => setDeleteModal(false)}
        handleSubmit={submitDeleteModel}
        type={MODAL_TYPE}
      />
    </>
  );
};
