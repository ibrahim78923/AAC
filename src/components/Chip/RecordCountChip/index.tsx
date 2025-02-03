import { Box, Typography } from '@mui/material';
import { CustomChip } from '../CustomChip';
import { CustomCircularProgress } from '../../ProgressBars/CustomCircularProgress';
import { CHIP_SHAPE } from '@/constants/mui-constant';
import { RecordCountChipPropsI } from '../Chip.interface';
import { Variant } from '@mui/material/styles/createTypography';
import { SELECTED_ARRAY_LENGTH } from '@/constants/strings';

export const RecordCountChip = (props: RecordCountChipPropsI) => {
  const {
    isCountLoading = false,
    totalCount = 0,
    recordName,
    color = 'secondary.main',
    recordNameVariant = 'h6',
  } = props;

  return (
    <Box display={'flex'} alignItems={'center'} gap={1} flexWrap={'wrap'}>
      <CustomChip
        size="medium"
        shape={CHIP_SHAPE?.SQUARE}
        color="secondary"
        backgroundColor={color}
        label={
          isCountLoading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <CustomCircularProgress />
            </Box>
          ) : totalCount < SELECTED_ARRAY_LENGTH?.TEN ? (
            `0${totalCount}`
          ) : (
            totalCount
          )
        }
      />
      <Typography variant={recordNameVariant as Variant} color={color}>
        {recordName}
      </Typography>
    </Box>
  );
};
