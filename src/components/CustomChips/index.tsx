import { Box, Chip, Typography } from '@mui/material';
import { CustomTooltip } from '../CustomTooltip';
import { truncateText } from '@/utils/avatarUtils';

export const CustomChips = (props: any) => {
  const { data = [], truncateTextLength = 10, sliceArray = 2 } = props;
  return (
    <>
      {data?.length <= sliceArray ? (
        data?.map((item: any) => (
          <CustomTooltip
            key={item?._id}
            title={item?.label?.length > truncateTextLength ? item?.label : ''}
          >
            <Chip
              size="small"
              label={truncateText(item?.label, truncateTextLength)}
              variant="filled"
              color={'primary'}
              sx={{ mx: 0.5, my: 0.5 }}
            />
          </CustomTooltip>
        ))
      ) : (
        <>
          {' '}
          {data?.slice?.(0, sliceArray)?.map((item: any) => (
            <CustomTooltip
              key={item?._id}
              title={
                item?.label?.length > truncateTextLength ? item?.label : ''
              }
            >
              <Chip
                size="small"
                label={truncateText(item?.label, truncateTextLength)}
                variant="filled"
                color={'primary'}
                sx={{ mx: 0.5, my: 0.5 }}
              />
            </CustomTooltip>
          ))}
          <CustomTooltip
            title={
              <Box maxHeight={'10vh'} px={1} pb={1} overflow={'auto'}>
                {data
                  ?.slice?.(sliceArray)
                  ?.map((item: any, index: number) => (
                    <Typography key={item?._id}>
                      {`${index + 1} : ${item?.label}`}
                    </Typography>
                  ))}
              </Box>
            }
          >
            <Chip
              size="small"
              label={`+${data?.length - sliceArray}`}
              variant="filled"
              color={'primary'}
            />
          </CustomTooltip>
        </>
      )}
    </>
  );
};
