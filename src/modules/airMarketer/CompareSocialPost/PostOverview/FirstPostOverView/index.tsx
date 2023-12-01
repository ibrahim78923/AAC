import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import { postsOverviewData } from '../../SelectPostModal/SelectPostModal.data';
import { v4 as uuidv4 } from 'uuid';

const FirstPostOverview = (props: any) => {
  const { postData } = props;
  const theme = useTheme();

  return (
    <Box>
      <Typography
        variant="body4"
        fontWeight={600}
        color={theme?.palette?.grey[600]}
      >
        Compaign
      </Typography>
      <Box>
        <Typography
          variant="body4"
          sx={{
            backgroundColor: '#F3F4F6',
            p: '2px 8px',
            borderRadius: '16px',
          }}
          color={theme?.palette?.slateBlue?.main}
        >
          {postData?.compaign}
        </Typography>
      </Box>
      <Card sx={{ width: '420px', p: '10px', position: 'relative', mt: 2 }}>
        <CardMedia component="img" height="162" image={postData?.image} />
        <CardHeader
          avatar={
            <Avatar
              src={postData?.avatar}
              sx={{ width: '30px', height: '30px' }}
            >
              R
            </Avatar>
          }
          title={
            <Typography
              variant="body2"
              fontWeight={600}
              color={theme?.palette?.grey[800]}
            >
              {postData?.heading}
            </Typography>
          }
          sx={{ py: '6px', px: '0px' }}
        />
        <CardContent sx={{ p: '0px' }}>
          <Typography
            variant="body1"
            fontWeight={500}
            color={theme?.palette?.grey[600]}
          >
            {postData?.description}
          </Typography>
          <Box display="flex" gap={3} mt={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body4" fontWeight={600} color="#000">
                Network
              </Typography>
              <Typography
                variant="body4"
                fontWeight={600}
                sx={{
                  backgroundColor: '#EBFAF8',
                  p: '4px 10px',
                  borderRadius: '5px',
                }}
                color={theme?.palette?.secondary?.main}
              >
                {postData?.category}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body4" fontWeight={600} color="#000">
                Published Date
              </Typography>
              <Typography
                variant="body4"
                fontWeight={600}
                sx={{
                  backgroundColor: '#EBFAF8',
                  p: '4px 10px',
                  borderRadius: '5px',
                }}
                color={theme?.palette?.secondary?.main}
              >
                {postData?.date}
              </Typography>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" mt={2}>
            {postsOverviewData?.map((item: any) => (
              <Box key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <Typography variant="body2">{item?.description}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FirstPostOverview;
