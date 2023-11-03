import { FilterIcon } from '@/assets/icons';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from '@mui/material';
import { Fragment, useState } from 'react';

export const UnassignedWork = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Fragment>
      <Button
        variant={'contained'}
        sx={{ mx: 2 }}
        onClick={() => setOpenDrawer(true)}
      >
        Unassigned Work
      </Button>

      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
      >
        <Box
          sx={{
            width: { xs: '100vw', md: '40vw' },
          }}
        >
          <Box display={'flex'} justifyContent={'space-between'} p={4}>
            <Box display={'flex'} gap={1}>
              <Avatar
                sx={{
                  bgcolor: 'primary.lighter',
                  color: 'primary.main',
                }}
              >
                A
              </Avatar>
              <Box>
                <Typography color={'custom.main'} variant="body2">
                  Alex Lexes Workload
                </Typography>
                <Typography variant="body2">5 June 2023</Typography>
                <Typography variant="body2">
                  3 in Total
                  <Chip
                    label="Unplanned"
                    sx={{
                      bgcolor: 'custom.pale_gray',
                      color: 'success.main',
                      ml: 2,
                    }}
                  />
                </Typography>
              </Box>
            </Box>
            <IconButton
              aria-label="filter"
              sx={{
                height: '50px',
                width: '50px',
                borderRadius: 2,
                boxShadow: 2,
              }}
            >
              <FilterIcon />
            </IconButton>
          </Box>
          <Divider />
        </Box>
      </Drawer>
    </Fragment>
  );
};
