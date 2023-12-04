import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { postsOverviewData } from '../../SelectPostModal/SelectPostModal.data';
import { v4 as uuidv4 } from 'uuid';
import { style } from '../../CompareSocialPost.style';
import Facebook from '@/assets/icons/modules/airMarketer/SocialMarketing/PostBox/facebook';
import Instagram from '@/assets/icons/modules/airMarketer/SocialMarketing/PostBox/instagram';

const SecondPostOverview = ({ postData }: any) => {
  return (
    <Box>
      <Typography variant="body4" fontWeight={600}>
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
        >
          {postData?.compaign}
        </Typography>
      </Box>
      <Card sx={{ width: '420px', p: '10px', position: 'relative', mt: 2 }}>
        <CardMedia component="img" height="162" image={postData?.image} />
        <CardHeader
          avatar={
            <Box sx={style?.avatarStyle(postData?.category)}>
              <Avatar src={postData?.avatar}></Avatar>
              <Box className="avatar-category">
                {postData?.category === 'facebook' ? (
                  <Facebook />
                ) : (
                  <Instagram />
                )}
              </Box>
            </Box>
          }
          title={
            <Typography variant="body2" fontWeight={600}>
              {postData?.heading}
            </Typography>
          }
          sx={{ py: '6px', px: '0px' }}
        />
        <CardContent sx={{ p: '0px' }}>
          <Typography variant="body1" fontWeight={500}>
            {postData?.description}
          </Typography>
          <Box display="flex" gap={3} mt={2}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body4" fontWeight={600}>
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
              >
                {postData?.category}
              </Typography>
            </Box>
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body4" fontWeight={600}>
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

export default SecondPostOverview;
