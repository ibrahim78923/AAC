import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import { postData } from '../SelectPostModal.data';
import { v4 as uuidv4 } from 'uuid';

const PostCards = (props: any) => {
  const {
    setIsSelectPostModal,
    setIsOverview,
    setSecondPost,
    setFirstPost,
    post,
  } = props;
  const theme = useTheme();
  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {postData?.map((item: any) => (
        <Card
          sx={{ width: '150px', p: '10px', position: 'relative' }}
          onClick={() => {
            setIsOverview(true);
            setIsSelectPostModal(false);
            post === 1 ? setFirstPost(item) : setSecondPost(item);
          }}
          key={uuidv4()}
        >
          <Box
            sx={{
              position: 'absolute',
              right: '5px',
              top: '6px',
              backgroundColor: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {item?.categoryIcon}
          </Box>
          <CardMedia component="img" height="81" image={item?.image} />
          <CardHeader
            avatar={
              <Avatar src={item?.avatar} sx={{ width: '30px', height: '30px' }}>
                R
              </Avatar>
            }
            title={
              <Typography
                variant="body4"
                fontWeight={600}
                color={theme?.palette?.secondary?.main}
              >
                {item?.heading}
              </Typography>
            }
            subheader={
              <Typography fontSize={8} color={theme?.palette?.secondary?.main}>
                {item?.date}
              </Typography>
            }
            sx={{ py: '6px', px: '0px' }}
          />
          <CardContent sx={{ p: '0px' }}>
            <Typography variant="body4" color={theme?.palette?.blue?.lighter}>
              {item?.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostCards;
