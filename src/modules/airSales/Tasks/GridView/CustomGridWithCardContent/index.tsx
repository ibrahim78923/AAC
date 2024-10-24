import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { CustomBox } from '../CustomBox';
import { style } from './CustomGridWithCardContent.style';
import { CustomGridWithCardI } from './CustomGridWithCard.interface';
import { useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { setSelectedTaskIds } from '@/redux/slices/taskManagement/taskManagementSlice';

export const CustomGridWithCardContent = ({
  title,
  data,
}: CustomGridWithCardI) => {
  const dispatch = useDispatch();

  const selectedTaskIds = useAppSelector(
    (state: any) => state?.task?.selectedTaskIds,
  );
  const handleClick = (itemId: any) => {
    if (selectedTaskIds?.includes(itemId)) {
      dispatch(
        setSelectedTaskIds(selectedTaskIds?.filter((id: any) => id !== itemId)),
      );
    } else {
      dispatch(setSelectedTaskIds([...selectedTaskIds, itemId]));
    }
  };

  return (
    <Grid item md={3}>
      <Box sx={style?.cardContainer}>
        <Box sx={style?.cardTitle}>{title}</Box>
        <Box sx={style?.cardWrapper}>
          {data?.map((obj: any) => (
            <Box sx={style?.cardContent} key={uuidv4()}>
              <Box
                display={'flex'}
                alignItems={'flex-end'}
                justifyContent={'space-between'}
              >
                <Box>
                  <Typography sx={style?.cardHead}>{obj?.name}</Typography>
                  <Typography sx={style?.cardSubHead}>
                    Last Date: {obj?.updatedAt}
                  </Typography>
                </Box>
                <Checkbox
                  checked={selectedTaskIds?.includes(obj?._id)}
                  onClick={() => handleClick(obj?._id)}
                />
              </Box>
              <CustomBox label={'Linked Company'} value={obj?.associate} />
              <CustomBox
                label={'Assigned User'}
                value={
                  (obj?.assignTo?.firstName || '-') +
                  '' +
                  (obj?.assignTo?.lastName || '-')
                }
              />
              <CustomBox
                label={'Task Status'}
                value={obj?.status}
                changeStatusColor
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};
