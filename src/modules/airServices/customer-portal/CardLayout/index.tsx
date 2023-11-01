import { Box, Button, Typography } from '@mui/material';
import { styles } from './CardLayout.style';

export const CardLayout = ({ title, btnClick, btnPosition, children }: any) => {
  const { cardWrapper, viewMoreBtn } = styles;

  return (
    <Box sx={cardWrapper}>
      <Typography fontWeight={600} color="grey.800">
        {title}
      </Typography>
      {children}
      <Box height={20}>
        <Button variant="text" sx={viewMoreBtn(btnPosition)} onClick={btnClick}>
          View More
        </Button>
      </Box>
    </Box>
  );
};
