import {
  Avatar,
  Box,
  Checkbox,
  Skeleton,
  Typography,
  useTheme,
} from '@mui/material';
import { style } from './CheckboxCard.style';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';
import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { generateImage } from '@/utils/avatarUtils';

const CheckboxCard = ({
  _id,
  card,
  handleSelect,
  selectedCardList,
  handleOpenDetailModal,
  isLoading,
  isFetching,
}: any) => {
  const { palette } = useTheme();
  const checked = !!selectedCardList?.find((item: any) => item?._id === _id);
  if (isLoading || isFetching) return <Skeleton />;
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
            sx={{
              bgcolor: palette?.custom?.dark,
              p: 1.2,
              width: 48,
              height: 48,
              borderRadius: '4px',
            }}
            src={generateImage(card?.createdBy?.avatar?.url)}
          />
          <Box>
            <Typography variant="h5" fontWeight={400} color={'grey.600'}>
              {card?.shopName}
            </Typography>
            <Typography variant="body2" color="custom.main">
              {card?.shopType}
            </Typography>
            <Typography variant="body3" color="grey.900">
              {dayjs(card?.date).format(DATE_FORMAT?.UI)}
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
