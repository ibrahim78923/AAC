import {
  Avatar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';

import Search from '@/components/Search';
import SMSDetailsTable from './SMSDetailsTable';
import useSMSBroadcast from '../../useSMSBroadcast';
import ImportIcon from '@/assets/icons/shared/import-icon';

const SMSDetails = ({ detailsData }: any) => {
  const { theme } = useSMSBroadcast();
  return (
    <Grid container spacing={2}>
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
              {detailsData?.campaign?.title ?? 'N/A'}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '13px' }}>
              Just Now
            </Typography>
          </Box>
        </Stack>
      </Grid>
      <Grid item xs={12} lg={5}>
        <Box
          sx={{
            width: '100%',
            height: '203px',
            padding: '16px',
            border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
            borderRadius: '8px',
          }}
        >
          <Typography
            dangerouslySetInnerHTML={{
              __html: detailsData?.campaign?.description,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
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
                <MenuItem value={'status'}>All</MenuItem>
                <MenuItem value={'sent'}>Sent</MenuItem>
                <MenuItem value={'delivered'}>Delivered</MenuItem>
                <MenuItem value={'read'}>Read</MenuItem>
                <MenuItem value={'replied'}>Replied</MenuItem>
                <MenuItem value={'failed'}>Failed</MenuItem>
              </Select>
            </FormControl>
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
