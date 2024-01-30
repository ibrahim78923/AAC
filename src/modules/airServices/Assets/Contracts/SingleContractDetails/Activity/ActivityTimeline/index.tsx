import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { Box, Divider, IconButton } from '@mui/material';
import { useActivity } from '../useActivity';
import { uuid } from 'uuidv4';

export const ActivityTimeline = () => {
  const { activitiesData, theme } = useActivity();
  return (
    <>
      {activitiesData.map((activityData: any) => (
        <Box
          key={uuid()}
          display={'flex'}
          flexWrap={'wrap'}
          alignItems={'center'}
          gap={1.25}
          marginBottom={1.5}
        >
          <Typography variant="body3" sx={{ flex: 0.15 }}>
            {activityData?.timeOne}
          </Typography>
          <IconButton
            disabled
            color="primary"
            sx={{ border: `1px solid ${theme?.palette?.primary?.main}` }}
          >
            <BorderColorIcon color="primary" />
          </IconButton>
          <Typography variant="body2" sx={{ flex: 0.8 }}>
            <Typography variant="body2" color="primary" marginRight={0.3}>
              {activityData?.createdBy}
            </Typography>
            {activityData?.timeTwo}{' '}
          </Typography>
        </Box>
      ))}
      <Box
        display={'flex'}
        flexWrap={'wrap'}
        alignItems={'center'}
        gap={1.3}
        marginBottom={1.5}
      >
        <Box flex={0.15}></Box>
        <Box></Box>
        <Divider
          orientation="vertical"
          sx={{
            borderRadius: '20px',
            background: theme?.palette?.primary?.light,
            width: '4px',
            height: '49px',
          }}
        />
        <Box flex={0.8}></Box>
      </Box>
    </>
  );
};
