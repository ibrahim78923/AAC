import {
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
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
      <Box
        borderBottom="0.06rem solid"
        borderColor="custom.light_lavender_gray"
        mb={2.5}
      >
        <PageTitledHeader
          title="Business Hours"
          canMovedBack
          moveBack={() => router?.push(AIR_SERVICES?.SERVICE_MANAGEMENT)}
        />
      </Box>
      <Grid container spacing={3}>
        <Grid
          item
          xs={3}
          href={AIR_SERVICES?.UPSERT_BUSINESS_HOUR}
          component={Link}
        >
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={1}
            height="12rem"
            border="0.06rem solid"
            borderColor="primary.main"
            borderRadius={2}
            sx={{ cursor: 'pointer' }}
          >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              width="2.1rem"
              height="2.1rem"
              border="0.13rem solid"
              borderColor="primary.main"
              borderRadius="50%"
            >
              <AddRoundedIcon
                sx={{
                  color: 'primary.main',
                }}
              />
            </Box>
            <Typography variant="subtitle2" color="blue.dark">
              Create New Template
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box
            height="12rem"
            border="0.06rem solid"
            borderColor="primary.main"
            borderRadius=".5rem"
            sx={{ cursor: 'pointer' }}
          >
            <Box display="flex" justifyContent="end">
              <IconButton onClick={handleActionClick}>
                <MoreVert
                  sx={{ color: 'secondary.lighter' }}
                  fontSize="medium"
                />
              </IconButton>
              <Menu
                open={openAction}
                anchorEl={actionPop}
                onClose={handleActionClose}
                sx={{ '& .MuiPaper-root': { boxShadow: 2 } }}
                transformOrigin={{ vertical: 10, horizontal: 80 }}
              >
                <MenuItem sx={{ pr: 5 }}>Edit</MenuItem>
                <MenuItem sx={{ pr: 5 }}>Delete</MenuItem>
              </Menu>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              height="60%"
            >
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
