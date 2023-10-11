import { NotSelectedItemImage } from '@/assets/images';
import { Card, CardContent, Typography, Box } from '@mui/material';
import Image from 'next/image';

const DetailsView = () => {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Details View
        </Typography>
        <Box>
          <Image src={NotSelectedItemImage} alt="not-selected-Item"></Image>
        </Box>
      </CardContent>
    </Card>
  );
};
export default DetailsView;
