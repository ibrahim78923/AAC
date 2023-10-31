import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Divider, IconButton } from '@mui/material';
import { useTheme } from '@mui/material';
import { activitiesData } from './Activities.data';
import { ActivitiesDataI } from './Activities.interface';
import { v4 as uuidv4 } from 'uuid';

export const Activities = () => {
  const theme = useTheme();
  return (
    <>
      {activitiesData.map((activity: ActivitiesDataI, index: number) => (
        <Box key={uuidv4()}>
          <Box display={'flex'}>
            <IconButton
              disabled
              color="primary"
              sx={{
                border: `0.063rem solid ${theme?.palette?.primary?.main}`,
                height: '1.75rem',
              }}
            >
              <BorderColorIcon color="primary" />
            </IconButton>
            <Box sx={{ marginLeft: 2 }}>
              <Typography
                variant="body2"
                color="primary"
                marginRight={0.3}
                component={'span'}
              >
                {activity.createdBy}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                marginRight={0.3}
                component={'span'}
              >
                {activity.createdByOne}
              </Typography>
              <Typography
                variant="body2"
                color="primary"
                marginRight={0.3}
                component={'span'}
              >
                {activity.createdByTwo}
              </Typography>

              <Box>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component={'span'}
                  mr="0.625rem"
                >
                  {activity.timeOne}
                </Typography>
                <Typography
                  variant="body2"
                  color="textPrimary"
                  component={'span'}
                >
                  {activity.timeTwo}
                </Typography>
              </Box>
              <Box sx={{ marginLeft: 2 }} key={uuidv4()}>
                {index === 1 && (
                  <ul>
                    <li>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component={'span'}
                      >
                        {activity.attachedTicketPoint}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        component={'span'}
                      >
                        {activity.attachedTicketPointOne}
                      </Typography>
                    </li>
                    <li>
                      <Typography
                        variant="body2"
                        color="textPrimary"
                        component={'span'}
                      >
                        {activity.attachedTicketThree}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="primary"
                        component={'span'}
                      >
                        {activity.attachedTicketPointFour}
                      </Typography>
                    </li>
                  </ul>
                )}
              </Box>
            </Box>
          </Box>
          <Box
            display={'flex'}
            flexWrap={'wrap'}
            alignItems={'center'}
            gap={1.3}
            marginBottom={1.5}
          >
            <Box flex={'0 0 0.4%'}></Box>
            <Divider
              orientation="vertical"
              sx={{
                borderRadius: '1.25rem',
                background: theme?.palette?.primary?.light,
                width: '0.25rem',
                height: '3.063rem',
              }}
            />
            <Box flex={0}></Box>
          </Box>
        </Box>
      ))}
    </>
  );
};
