import { Box, Chip, Typography } from '@mui/material';
import { CustomTooltip } from '../../CustomTooltip';

export const TooltipItemsCountChip = (props: any) => {
  const { data = [] } = props;
  return (
    <CustomTooltip
      title={
        !!data?.length && (
          <Box maxHeight={'10vh'} overflow={'auto'}>
            {data?.map((item: any, index: number) => (
              <Typography key={item?._id} variant="body2">
                {`${index + 1} : ${item?.label}`}
              </Typography>
            ))}
          </Box>
        )
      }
    >
      <Chip
        size="small"
        label={data?.length}
        variant="filled"
        color={'primary'}
      />
    </CustomTooltip>
  );
};
