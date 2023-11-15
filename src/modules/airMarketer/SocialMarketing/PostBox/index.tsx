import {
  Card,
  CardHeader,
  CardMedia,
  Typography,
  Avatar,
  CardContent,
  Box,
} from '@mui/material';

import { postCardsData } from './PostCards.data';

import { v4 as uuidv4 } from 'uuid';

const PostBoxCards = (props: any) => {
  const { setIsSelectPostModal, setIsOverview } = props;

  return (
    <Box display="flex" gap={2} flexWrap="wrap">
      {postCardsData?.map((item: any) => (
        <Card
          sx={{ width: '185px', p: '10px', position: 'relative' }}
          onClick={() => {
            setIsOverview(true);
            setIsSelectPostModal(false);
          }}
          key={uuidv4()}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {item?.title}
          </Box>
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
            <Box
              sx={{
                background: '#4CCFBC',
                color: '#FFFFFF',
                padding: '2px',
                borderRadius: '4px',
                marginRight: '10px',
              }}
            >
              {item?.titleNo}
            </Box>
          </Box>
          <CardMedia component="img" height="81" image={item?.image} />
          <CardHeader
            avatar={
              <Avatar src={item?.avatar} sx={{ width: '30px', height: '30px' }}>
                R
              </Avatar>
            }
            title={
              <Typography variant="body4" fontWeight={600}>
                {item?.heading}
              </Typography>
            }
            subheader={<Typography fontSize={8}>{item?.date}</Typography>}
            sx={{ py: '6px', px: '0px' }}
          />
          <CardContent sx={{ p: '0px' }}>
            <Typography variant="body4">{item?.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default PostBoxCards;
