import { Box, Divider, Typography } from '@mui/material';
import { AntSwitch } from '../SwitchButton.style';
import { EditYellowBGPenIcon } from '@/assets/icons';
import { usePurchaseOrders } from './usePurchaseOrders';

export const PurchaseOrders = () => {
  const { purchaseOrder, setShowIcon, showIcon, onSwitchChange } =
    usePurchaseOrders();

  return (
    <Box>
      <Box>
        <Typography variant="h4">Requester Notification</Typography>
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
      {purchaseOrder?.map((item) => {
        return (
          <Box
            key={item?.id}
            p={2}
            my={1}
            display={'flex'}
            height={{ xs: 'unset', md: 50 }}
            justifyContent={'space-between'}
            borderRadius={2}
            bgcolor={'grey.300'}
            onMouseEnter={() => setShowIcon(item)}
            onMouseLeave={() => setShowIcon(null)}
            sx={{ cursor: 'pointer' }}
          >
            {item?.name}
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Box>
                {showIcon === item ? (
                  <Box>
                    <EditYellowBGPenIcon />
                  </Box>
                ) : null}
              </Box>
              <AntSwitch
                onChange={() => {
                  onSwitchChange(item?.id);
                }}
                checked={item?.value}
              />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};
