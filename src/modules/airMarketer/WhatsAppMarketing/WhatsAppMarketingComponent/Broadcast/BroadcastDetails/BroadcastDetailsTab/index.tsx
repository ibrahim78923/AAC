import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import Search from '@/components/Search';
import DetailsTable from './DetailsTable';
import GetAppIcon from '@mui/icons-material/GetApp';
import { styles } from './BroadcastDetailsTab.style';
import { AlertModals } from '@/components/AlertModals';
import { AlertModalDeleteIcon } from '@/assets/icons';
import useBroadcastDetails from '../useBroadcastDetails';

const BroadcastDetailsTab = () => {
  const { openModalDelete, handleOpenDelete, handleCloseDelete } =
    useBroadcastDetails();

  return (
    <>
      <Box sx={{ p: '0 24px' }}>
        <Box sx={styles?.media}>{/* Image here */}</Box>

        <Box sx={styles?.previewDetails}>
          <p>
            <b>Hello</b>
          </p>
          <p>Welcome to | Lashes Makeup Studio</p>
          <p>For bridal makeup package details plz click the link below</p>
          <a href="https://google.com">Link</a>
        </Box>

        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ pt: '32px', pb: '16px' }}
        >
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
      </Box>

      <DetailsTable deleteBroadcast={handleOpenDelete} />

      <AlertModals
        message="Are you sure you want to delete this broadcast?"
        type="Delete Broadcast"
        typeImage={<AlertModalDeleteIcon />}
        open={openModalDelete}
        handleClose={handleCloseDelete}
        handleSubmit={handleCloseDelete}
      />
    </>
  );
};

export default BroadcastDetailsTab;
