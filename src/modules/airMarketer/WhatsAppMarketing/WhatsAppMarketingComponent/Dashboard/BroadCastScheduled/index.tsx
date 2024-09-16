import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

import useBroadCastScheduled from './useBroadCastScheduled';
import { v4 as uuidv4 } from 'uuid';
import { styles } from './BroadCastScheduled.style';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS } from '@/constants/permission-keys';
import dayjs from 'dayjs';
import { DATE_FORMAT, indexNumbers } from '@/constants';
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import { capitalizeFirstLetter } from '@/utils/api';

const ScheduledSMS = (props: any) => {
  const { setTabVal } = props;
  const { theme, statusTag, broadcastsData, getBroadcastLoading } =
    useBroadCastScheduled();
  return (
    <Box sx={{ pl: '24px' }}>
      <Box sx={styles?.scheduledSMSCardStyle}>
        <Box className="scheduledSMSHeader">
          <Typography variant="h4" sx={styles?.heading(theme)}>
            Broadcast Schedule
          </Typography>
          <PermissionsGuard
            permissions={[
              AIR_MARKETER_WHATSAPP_MARKETING_PERMISSIONS?.VIEW_BROADCAST_SCHEDULE,
            ]}
          >
            <Button
              variant="contained"
              className="small"
              onClick={() => setTabVal(indexNumbers?.ONE)}
            >
              View All
            </Button>
          </PermissionsGuard>
        </Box>
        {getBroadcastLoading ? (
          <SkeletonTable />
        ) : (
          <Box className="cardWrapper">
            {broadcastsData?.map((item: any) => {
              return (
                <Card sx={{ my: 1 }} key={uuidv4()}>
                  <CardContent>
                    <CardHeader item={item} statusTag={statusTag} />
                    <Typography variant="body2" color="text.secondary">
                      {item?.detail}
                    </Typography>
                    <Stack
                      direction={{ sx: 'column', sm: 'row' }}
                      justifyContent="space-between"
                    >
                      <Typography>
                        <Typography
                          component="span"
                          sx={{ color: theme?.palette?.primary?.main }}
                        >
                          Created:
                        </Typography>
                        {dayjs(item?.createdAt).format(DATE_FORMAT?.UI)}
                      </Typography>
                      <Typography>
                        <Typography
                          component="span"
                          sx={{ color: theme?.palette?.primary?.main }}
                        >
                          Recipients:
                        </Typography>
                        {item?.recipients?.length < 10
                          ? `0${item?.recipients?.length}`
                          : item?.recipients?.length}{' '}
                        Contacts
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CardHeader = ({ item, statusTag }: any) => {
  {
    /* commented code use after some time */
  }

  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event?.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <>
      <Stack
        direction={{ sx: 'column', sm: 'row' }}
        justifyContent="space-between"
      >
        <Typography gutterBottom variant="h5" component="div">
          {capitalizeFirstLetter(item?.name) ?? 'N/A'}
        </Typography>
        <Box
          sx={{ display: 'flex', alignItems: 'center', marginRight: '-15px' }}
        >
          <Box sx={styles?.cardHeader}>
            <Box
              sx={{
                width: '10px',
                height: '10px',
                backgroundColor: `${statusTag(item?.status)}`,
                borderRadius: '50%',
              }}
            />
            {item?.status}
          </Box>

          {/* use after some time */}

          {/* <Button
            sx={{ width: '5px', height: 'auto', padding: '0px' }}
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <DotsBoldIcon />
          </Button> */}
        </Box>
      </Stack>
      {/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu> */}
    </>
  );
};

export default ScheduledSMS;
