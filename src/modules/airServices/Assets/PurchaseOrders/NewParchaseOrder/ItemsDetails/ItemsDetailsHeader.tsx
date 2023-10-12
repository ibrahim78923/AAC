import {
  itemsDetailsList,
  itemsDetailsSubList,
} from '../NewPurchaseOrder.data';
import { Box, Typography } from '@mui/material';
import { styles } from '../NewPurchaseOrder.style';

const ItemsDetailsHeader = () => {
  const { flexBetween, headItemWrapper, headItem } = styles();
  return (
    <Box sx={{ ...flexBetween, ...headItemWrapper }}>
      {itemsDetailsList?.map((headerItem) => (
        <Typography
          key={headerItem?.value}
          sx={{
            ...headItem,
            flex: itemsDetailsSubList?.includes(headerItem?.value) ? 3 : 1,
          }}
        >
          {headerItem?.label}
        </Typography>
      ))}
    </Box>
  );
};

export default ItemsDetailsHeader;
