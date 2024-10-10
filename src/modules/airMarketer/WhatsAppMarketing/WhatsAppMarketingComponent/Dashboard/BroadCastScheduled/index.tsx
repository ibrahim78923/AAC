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
            {broadcastsData?.length > 0 ? (
              broadcastsData?.map((item: any) => {
                return (
                  <Card sx={{ my: 1, py: 1, px: 2 }} key={uuidv4()}>
                    <CardHeader item={item} statusTag={statusTag} />
                    <CardContent sx={{ p: 0, pb: 0 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ pb: 1.5 }}
                      >
                        {item?.detail}
                      </Typography>
                      <Stack
                        direction={{ sx: 'column', sm: 'row' }}
                        justifyContent="space-between"
                      >
                        <Typography variant="body3" fontWeight={600}>
                          <Typography
                            variant="body3"
                            component="span"
                            fontWeight={600}
                            color={theme?.palette?.primary?.main}
                          >
                            Created:
                          </Typography>
                          {dayjs(item?.createdAt).format(DATE_FORMAT?.UI)}
                        </Typography>
                        <Typography variant="body3" fontWeight={600}>
                          <Typography
                            variant="body3"
                            fontWeight={600}
                            component="span"
                            color={theme?.palette?.primary?.main}
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
              })
            ) : (
              <Typography variant="h6" color={theme?.palette?.grey[500]}>
                No Broadcast Found
              </Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const CardHeader = ({ item, statusTag }: any) => {
  return (
    <Stack
      direction={{ sx: 'column', sm: 'row' }}
      justifyContent="space-between"
    >
      <Typography gutterBottom variant="h5" component="div">
        {capitalizeFirstLetter(item?.name) ?? 'N/A'}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '-15px' }}>
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
      </Box>
    </Stack>
  );
};

export default ScheduledSMS;
