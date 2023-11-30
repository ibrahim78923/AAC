import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import { styles } from './BusinessHours.styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MoreVert from '@mui/icons-material/MoreVert';
import { ClockWithBagIcon } from '@/assets/icons';
import Link from 'next/link';
import { AIR_SERVICES } from '@/constants';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { useBusinessHour } from './useBusinessHour';

export const BusinessHours = () => {
  const {
    router,
    openAction,
    handleActionClick,
    handleActionClose,
    actionPop,
  } = useBusinessHour();
  return (
    <>
      <Box sx={styles?.headerBox}>
        <PageTitledHeader
          title="Business Hours"
          canMovedBack
          moveBack={() => router?.back()}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid
          item
          xs={3}
          href={AIR_SERVICES?.CREATE_BUSINESS_HOUR}
          component={Link}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap=".7rem"
            sx={styles?.mainBox}
          >
            <Box sx={styles?.iconParent}>
              <AddRoundedIcon sx={styles?.plusIcon} />
            </Box>
            <Typography variant="subtitle2" color="blue.dark">
              Create New Template
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box sx={styles?.mainBox}>
            <Box display="flex" justifyContent="end">
              <IconButton onClick={handleActionClick}>
                <MoreVert sx={styles?.moreIcon} fontSize="medium" />
              </IconButton>
              <Menu
                open={openAction}
                anchorEl={actionPop}
                onClose={handleActionClose}
                sx={styles?.menuParent}
                transformOrigin={{ vertical: 10, horizontal: 80 }}
              >
                <MenuItem sx={styles?.menuItem}>Edit</MenuItem>
                <MenuItem sx={styles?.menuItem}>Delete</MenuItem>
              </Menu>
            </Box>
            <Box sx={styles?.businessHourCard}>
              <ClockWithBagIcon />
              <Typography fontWeight={600} color="blue.dark" mt="0.7rem">
                Clock Log
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
