import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import Search from '@/components/Search';
import DetailsTable from './DetailsTable';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styles } from './BroadcastDetailsTab.style';

const BroadcastDetailsTab = () => {
  return (
    <Grid container spacing={'16px'}>
      <Grid item xs={12}>
        <Box sx={styles.media}></Box>
      </Grid>
      <Grid item xs={12}>
        <Box sx={styles.previewDetails}></Box>
      </Grid>
      <Grid xs={12}>
        <Stack direction="row" justifyContent="space-between" my={2}>
          <Search placeholder="Search Here" size="small" />
          <Box sx={{ gap: 1, display: 'flex' }}>
            <FormControl size="small">
              <Select
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
            <Button
              sx={{ height: '40px' }}
              variant="outlined"
              endIcon={<GetAppIcon />}
            >
              Export
            </Button>
          </Box>
        </Stack>
        <DetailsTable />
      </Grid>
    </Grid>
  );
};

export default BroadcastDetailsTab;
