import {
  Card,
  CardContent,
  Grid,
  CardActionArea,
  Box,
  Typography,
} from '@mui/material';

import { dashboardCardData } from '@/mock/modules/airMarketer/Dashboard';

import useCategories from './useCategories';
import CreateForm from '../CreateForm';

import { FeaturedMarketingIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

const Categories = () => {
  const { theme, isShowCreateDashboard, setIsShowCreateDashboard } =
    useCategories();
  return (
    <Box sx={{ py: '30px' }}>
      <Grid container>
        {dashboardCardData?.map((card: any) => (
          <Grid item xs={12} md={3} key={uuidv4()}>
            <Card
              onClick={() => setIsShowCreateDashboard(true)}
              className="card-hover-color cursor-pointer"
              sx={{
                boxShadow: 'none',
                borderRadius: '6px',
                '&:hover': {
                  transition: '0.3s',
                  outline: `1.5px solid ${theme?.palette?.primary?.main}`,
                  boxShadow: '0px 1px 1px -1px',
                },
              }}
            >
              <CardActionArea
                disableRipple
                sx={{
                  display: 'flex',
                  color: '#212121',
                  pt: 4,
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <FeaturedMarketingIcon />
                <CardContent sx={{ display: 'block', textAlign: 'center' }}>
                  <Typography variant="h5">{card?.title}</Typography>
                  <Typography variant="body2" mt={2} mb={5}>
                    {card?.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {isShowCreateDashboard && (
        <CreateForm
          isOpenDrawer={isShowCreateDashboard}
          onClose={() => setIsShowCreateDashboard(false)}
        />
      )}
    </Box>
  );
};
export default Categories;
