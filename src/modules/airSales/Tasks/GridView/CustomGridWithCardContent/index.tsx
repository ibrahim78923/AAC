import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { uuid } from 'uuidv4';
import { CustomBox } from '../CustomBox';
import { style } from './CustomGridWithCardContent.style';
import { CustomGridWithCardI } from './CustomGridWithCard.interface';

export const CustomGridWithCardContent = ({
  title,
  data,
}: CustomGridWithCardI) => {
  return (
    <Grid item md={3} key={uuid()}>
      <Box sx={style?.cardContainer}>
        <Box sx={style?.cardTitle}>{title}</Box>
        <Box sx={style?.cardWrapper}>
          {data?.map((obj: any) => (
            <Box sx={style?.cardContent} key={uuid()}>
              <Box
                display={'flex'}
                alignItems={'flex-end'}
                justifyContent={'space-between'}
              >
                <Box>
                  <Typography sx={style?.cardHead}>{obj?.taskName}</Typography>
                  <Typography sx={style?.cardSubHead}>
                    Last Date: {obj?.lastDate}
                  </Typography>
                </Box>
                <Checkbox />
              </Box>

              <CustomBox label={'Linked Company'} value={obj?.linkedCompany} />
              <CustomBox label={'Assigned User'} value={obj?.assignedUser} />
              <CustomBox
                label={'Task Status'}
                value={obj?.taskStatus}
                changeStatusColor
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Grid>
  );
};
