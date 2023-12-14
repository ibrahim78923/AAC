import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  Tooltip,
  Typography,
} from '@mui/material';

import Search from '@/components/Search';

import SMSDetailsTable from './SMSDetailsTable';

import useSMSBroadcast from '../../useSMSBroadcast';
import ImportIcon from '@/assets/icons/shared/import-icon';
import { RefreshTasksIcon } from '@/assets/icons';

const SMSDetails = () => {
  const { theme } = useSMSBroadcast();
  return (
    <Grid container sx={{ p: 1 }}>
      <Grid item xs={12}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Avatar />
          <Box>
            <Typography
              variant="body2"
              fontWeight={700}
              sx={{
                color: theme?.palette?.custom?.text_slate_blue,
                fontSize: '15px',
              }}
            >
              Compaign Name
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Just Now
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Typography variant="h6">Details</Typography>
        <TextareaAutosize
          style={{
            width: '100%',
            height: '203px',
            padding: '16px',
            border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            borderRadius: '8px',
          }}
        />
      </Grid>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <Search placeholder="Search Here" size="small" />
          <Box sx={{ gap: 1, display: 'flex' }}>
            <FormControl size="small">
              <Select
                sx={{ height: '36px' }}
                defaultValue={'status'}
                // value={age}
                // onChange={handleChange}
              >
                <MenuItem value={'status'} disabled>
                  All
                </MenuItem>
                <MenuItem value={'sent'}>Sent</MenuItem>
                <MenuItem value={'delivered'}>Delivered</MenuItem>
                <MenuItem value={'read'}>Read</MenuItem>
                <MenuItem value={'replied'}>Replied</MenuItem>
                <MenuItem value={'failed'}>Failed</MenuItem>
              </Select>
            </FormControl>
            <Tooltip title={'Refresh Filter'}>
              <Button variant="outlined" color="inherit" className="small">
                <RefreshTasksIcon />
              </Button>
            </Tooltip>
            <Button
              className="small"
              variant="outlined"
              color="inherit"
              endIcon={<ImportIcon />}
            >
              Export
            </Button>
          </Box>
        </Stack>
        <SMSDetailsTable />
      </Grid>
    </Grid>
  );
};

export default SMSDetails;
