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
    <Grid item md={3}>
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
                  <Typography sx={style?.cardHead}>{obj?.name}</Typography>
                  <Typography sx={style?.cardSubHead}>
                    Last Date: {obj?.updatedAt}
                  </Typography>
                </Box>
                <Checkbox />
              </Box>

              <CustomBox label={'Linked Company'} value={obj?.associate} />
              <CustomBox label={'Assigned User'} value={obj?.assignTo} />
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
