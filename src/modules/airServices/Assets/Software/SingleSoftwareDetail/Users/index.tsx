import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { data, columns, userDropdown } from './Users.data';
import TanstackTable from '@/components/Tabel/TanstackTable';
import Search from '@/components/Search';
import { Button } from '@mui/material';
import {
  ExportShared,
  FilterSharedIcon,
  GreyPlusSharedIcon,
} from '@/assets/icons';
import { styles } from './Users.style';
import { useTheme } from '@emotion/react';
import { TicketsAction } from '@/modules/airServices/ServicesTickets/TicketsLists/components/TicketsAction';

function Installations() {
  const [installationData, setInstallationData] = useState([]);
  const theme: any = useTheme();

  return (
    <Grid container>
      <Grid item sx={styles.gridItems}>
        <Box sx={styles.headBox}>
          <Box sx={{ marginLeft: '24px' }}>
            <Search label="search" width="100%" />
          </Box>
          <Box sx={styles.buttonBox}>
            <Box sx={styles.dropdownBox}>
              <TicketsAction
                ticketsActionDropdown={userDropdown}
                disabled={true}
              />
            </Box>
            <Button
              sx={styles.exportButtonStyle(theme)}
              variant="outlined"
              startIcon={<GreyPlusSharedIcon />}
            >
              Add User
            </Button>
            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              startIcon={<ExportShared />}
            >
              Export
            </Button>
            <Button
              sx={styles.buttonStyle(theme)}
              variant="outlined"
              startIcon={<FilterSharedIcon />}
            >
              Filter
            </Button>
          </Box>
        </Box>
        <Box sx={{ marginBottom: '25px' }}>
          <TanstackTable
            data={data}
            columns={columns(
              installationData,
              setInstallationData,
              data,
              theme,
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default Installations;
