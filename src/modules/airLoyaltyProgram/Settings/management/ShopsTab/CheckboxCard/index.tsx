import { Avatar, Box, Checkbox, Typography, useTheme } from '@mui/material';
import { style } from './CheckboxCard.style';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';

const CheckboxCard = ({
  _id,
  icon,
  shopName = '',
  shopeType = '',
  date,
  handleSelect,
  selectedCardList,
  handleOpenDetailModal,
}: any) => {
  const { palette } = useTheme();
  const checked = !!selectedCardList?.find((item: any) => item?._id === _id);
  return (
    <>
      <Box sx={style?.cardWrapper(palette, checked)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'start',
            gap: 2,
          }}
          onClick={() => handleOpenDetailModal({ _id })}
        >
          <Avatar
            variant="rounded"
            src={icon}
            alt={shopName}
            sx={{
              bgcolor: palette?.custom?.dark,
              p: 1.2,
              width: 48,
              height: 48,
              borderRadius: '4px',
            }}
          />
          <Box>
            <Typography variant="h5" fontWeight={400} color={'grey.600'}>
              {shopName}
            </Typography>
            <Typography variant="body2" color="custom.main">
              {shopeType}
            </Typography>
            <Typography variant="body3" color="grey.900">
              {dayjs(date).format(DATE_FORMAT?.UI)}
            </Typography>
          </Box>
        </Box>
        <Checkbox
          icon={<CheckboxIcon />}
          checkedIcon={<CheckboxCheckedIcon />}
          checked={checked}
          onChange={() => handleSelect({ _id })}
          color="primary"
          name="id"
        />
      </Box>
    </>
  );
};

export default CheckboxCard;
